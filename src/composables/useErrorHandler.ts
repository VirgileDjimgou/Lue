import { ref, readonly } from 'vue';
import { useAppStore } from '@/stores/app';

export interface ErrorInfo {
  message: string;
  details?: string;
  timestamp: Date;
  action?: string;
}

export const useErrorHandler = () => {
  const store = useAppStore();
  const isHandlingError = ref(false);

  const handleError = (error: Error | string, details?: string, action?: string) => {
    if (isHandlingError.value) return; // Avoid error loops
    
    isHandlingError.value = true;
    
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorInfo: ErrorInfo = {
      message: errorMessage,
      details: details || (typeof error === 'object' ? error.stack : undefined),
      timestamp: new Date(),
      action
    };

    console.error('Error captured:', errorInfo);
    store.setError(errorMessage);
    
    // Reset after a delay
    setTimeout(() => {
      isHandlingError.value = false;
    }, 1000);
  };

  const handleAsyncError = async <T>(
    asyncFn: () => Promise<T>,
    errorMessage = 'An error occurred'
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error, undefined, errorMessage);
      return null;
    }
  };

  const clearError = () => {
    store.setError(null);
  };

  return {
    handleError,
    handleAsyncError,
    clearError,
    isHandlingError: readonly(isHandlingError)
  };
};
