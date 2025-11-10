import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './routes/AppRouter';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#111827',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        }}
        containerStyle={{
          top: 20,
          right: 20,
          fontSize: '0.875rem',
        } as React.CSSProperties & { 'data-role'?: string; 'aria-live'?: string; 'aria-atomic'?: string; }}
      />
      <AppRouter />
    </QueryClientProvider>
  );
}
export default App;
