// src/App.jsx
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routing/router.jsx';

function App() {
  return <RouterProvider router={router} />;
}

export default App;