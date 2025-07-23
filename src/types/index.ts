export interface ModelState {
  net: any;
  inputShape: number[];
  isLoaded: boolean;
  isLoading: boolean;
  progress: number;
}

export interface DetectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
  color: string;
}

export interface StreamState {
  type: 'image' | 'video' | 'camera' | null;
  isActive: boolean;
}

export interface AppConfig {
  modelName: string;
  modelPath: string;
  confidence: number;
  iouThreshold: number;
  maxBoxes: number;
}

export type MediaElement = HTMLImageElement | HTMLVideoElement;
