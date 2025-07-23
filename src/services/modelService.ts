import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import type { ModelState, MediaElement } from '@/types';
import { COCO_LABELS, DETECTION_CONFIG, COLORS } from '@/constants';

export class ModelService {
  private static instance: ModelService;

  static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }
    return ModelService.instance;
  }

  async loadModel(
    modelPath: string,
    onProgress?: (progress: number) => void
  ): Promise<{ net: tf.GraphModel; inputShape: number[] }> {
    try {
      await tf.ready();

      const model = await tf.loadGraphModel(modelPath, {
        onProgress: (fractions) => {
          if (onProgress) {
            onProgress(fractions);
          }
        }
      });

      // Warm up the model
      const dummyInput = tf.ones(model.inputs[0].shape as number[]);
      const warmupResults = model.execute(dummyInput);
      
      tf.dispose([warmupResults, dummyInput]);

      return {
        net: model,
        inputShape: model.inputs[0].shape as number[]
      };
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error(`Failed to load model: ${error}`);
    }
  }

  preprocess(
    source: MediaElement,
    modelWidth: number,
    modelHeight: number
  ): { input: tf.Tensor; xRatio: number; yRatio: number } {
    return tf.tidy(() => {
      const img = tf.browser.fromPixels(source);
      
      // Get dimensions
      const [h, w] = img.shape.slice(0, 2) as [number, number];
      const maxSize = Math.max(w, h);
      
      // Pad image to square
      const imgPadded = img.pad([
        [0, maxSize - h],
        [0, maxSize - w], 
        [0, 0]
      ]);

      const xRatio = maxSize / w;
      const yRatio = maxSize / h;

      const input = tf.image
        .resizeBilinear(imgPadded as tf.Tensor3D, [modelWidth, modelHeight])
        .div(255.0)
        .expandDims(0);

      return { input, xRatio, yRatio };
    });
  }

  async detect(
    source: MediaElement,
    model: ModelState,
    canvas: HTMLCanvasElement
  ): Promise<void> {
    if (!model.net || !model.isLoaded) {
      throw new Error('Model is not loaded');
    }

    const [modelWidth, modelHeight] = model.inputShape.slice(1, 3);

    tf.engine().startScope();

    try {
      const { input, xRatio, yRatio } = this.preprocess(source, modelWidth, modelHeight);

      // Run inference
      const res = model.net.execute(input) as tf.Tensor;
      const transRes = res.transpose([0, 2, 1]);

      // Process boxes
      const boxes = tf.tidy(() => {
        const w = transRes.slice([0, 0, 2], [-1, -1, 1]);
        const h = transRes.slice([0, 0, 3], [-1, -1, 1]);
        const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2));
        const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2));
        
        return tf.concat([
          y1, x1,
          tf.add(y1, h),
          tf.add(x1, w)
        ], 2).squeeze();
      });

      // Get scores and classes
      const [scores, classes] = tf.tidy(() => {
        const rawScores = transRes.slice([0, 0, 4], [-1, -1, COCO_LABELS.length]).squeeze([0]);
        return [rawScores.max(1), rawScores.argMax(1)];
      });

      // Apply NMS
      const nms = await tf.image.nonMaxSuppressionAsync(
        boxes as tf.Tensor2D,
        scores as tf.Tensor1D,
        DETECTION_CONFIG.MAX_BOXES,
        DETECTION_CONFIG.IOU_THRESHOLD,
        DETECTION_CONFIG.SCORE_THRESHOLD
      );

      const boxesData = boxes.gather(nms, 0).dataSync();
      const scoresData = scores.gather(nms, 0).dataSync();
      const classesData = classes.gather(nms, 0).dataSync();

      this.renderBoxes(canvas, boxesData, scoresData, classesData, [xRatio, yRatio]);

      tf.dispose([res, transRes, boxes, scores, classes, nms]);
    } finally {
      tf.engine().endScope();
    }
  }

  private renderBoxes(
    canvas: HTMLCanvasElement,
    boxesData: Float32Array | Int32Array | Uint8Array,
    scoresData: Float32Array | Int32Array | Uint8Array,
    classesData: Float32Array | Int32Array | Uint8Array,
    ratios: [number, number]
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const [xRatio, yRatio] = ratios;
    const font = `${Math.max(Math.round(Math.max(canvas.width, canvas.height) / 40), 14)}px Arial`;
    ctx.font = font;
    ctx.textBaseline = 'top';

    for (let i = 0; i < scoresData.length; i++) {
      const score = scoresData[i] * 100;
      if (score < DETECTION_CONFIG.CONFIDENCE_THRESHOLD * 100) continue;

      const klass = COCO_LABELS[classesData[i]];
      const color = COLORS[classesData[i] % COLORS.length];

      let [y1, x1, y2, x2] = [
        boxesData[i * 4] / yRatio,
        boxesData[i * 4 + 1] / xRatio,
        boxesData[i * 4 + 2] / yRatio,
        boxesData[i * 4 + 3] / xRatio
      ];

      const width = x2 - x1;
      const height = y2 - y1;

      // Draw bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, width, height);

      // Draw label background
      const label = `${klass} ${score.toFixed(1)}%`;
      const textWidth = ctx.measureText(label).width;
      const textHeight = parseInt(font, 10);

      ctx.fillStyle = color;
      ctx.fillRect(x1, y1, textWidth + 10, textHeight + 4);

      // Draw label text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(label, x1 + 5, y1 + 2);
    }
  }

  async detectVideo(
    videoElement: HTMLVideoElement,
    model: ModelState,
    canvas: HTMLCanvasElement
  ): Promise<void> {
    const detectFrame = async () => {
      if (videoElement.videoWidth === 0 && videoElement.srcObject === null) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      await this.detect(videoElement, model, canvas);
      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  }
}
