export class WebcamService {
  private static instance: WebcamService;

  static getInstance(): WebcamService {
    if (!WebcamService.instance) {
      WebcamService.instance = new WebcamService();
    }
    return WebcamService.instance;
  }

  async openWebcam(videoElement: HTMLVideoElement): Promise<MediaStream> {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      videoElement.srcObject = stream;
      return stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
      throw new Error(`Failed to access webcam: ${error}`);
    }
  }

  closeWebcam(videoElement: HTMLVideoElement): void {
    try {
      if (videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    } catch (error) {
      console.error('Error closing webcam:', error);
    }
  }

  isWebcamSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
}
