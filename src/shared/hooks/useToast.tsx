import toast from 'react-hot-toast';
interface ToastConfig {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}
const defaultConfig: ToastConfig = {
  duration: 4000,
  position: 'top-right',
};
export function useToast() {
  const ToastWithAriaStatus = ({ message }: { message: string }) => (
    <div role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
  const ToastWithAriaAlert = ({ message }: { message: string }) => (
    <div role="alert" aria-live="assertive" aria-atomic="true">
      {message}
    </div>
  );
  const success = (message: string, config?: ToastConfig) => {
    return toast.success(
      <ToastWithAriaStatus message={message} />,
      {
        duration: config?.duration ?? defaultConfig.duration,
        position: config?.position ?? (defaultConfig.position as any),
        style: {
          background: '#10b981',
          color: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '12px 16px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      }
    );
  };
  const error = (message: string, config?: ToastConfig) => {
    return toast.error(
      <ToastWithAriaAlert message={message} />,
      {
        duration: config?.duration ?? defaultConfig.duration,
        position: config?.position ?? (defaultConfig.position as any),
        style: {
          background: '#ef4444',
          color: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '12px 16px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
      }
    );
  };
  const warning = (message: string, config?: ToastConfig) => {
    return toast(
      <ToastWithAriaAlert message={message} />,
      {
        duration: config?.duration ?? defaultConfig.duration,
        position: config?.position ?? (defaultConfig.position as any),
        style: {
          background: '#f59e0b',
          color: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '12px 16px',
        },
        icon: '⚠️',
      }
    );
  };
  const info = (message: string, config?: ToastConfig) => {
    return toast(
      <ToastWithAriaStatus message={message} />,
      {
        duration: config?.duration ?? defaultConfig.duration,
        position: config?.position ?? (defaultConfig.position as any),
        style: {
          background: '#3b82f6',
          color: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '12px 16px',
        },
        icon: 'ℹ️',
      }
    );
  };
  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };
  return {
    success,
    error,
    warning,
    info,
    dismiss,
  };
}
