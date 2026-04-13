// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store/store.js';
import App from './App.jsx';
import './index.css';

// TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,          // retry failed requests once
      staleTime: 30000,  // data fresh for 30 seconds
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* Redux wraps everything - state available anywhere */}
      <QueryClientProvider client={queryClient}>
        {/* TanStack Query wraps everything - caching available anywhere */}
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);