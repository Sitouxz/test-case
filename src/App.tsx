import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes/routes';
import Layouts from './components/layouts/Layouts';
import PageNotFound from './pages/PageNotFound/PageNotFound';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      element: <Layouts />,
      errorElement: <PageNotFound />,
      children: routes
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
