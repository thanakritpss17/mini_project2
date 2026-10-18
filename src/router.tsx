import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { CollectionPage } from './pages/CollectionPage';
import { PointsPage } from './pages/PointsPage';
import { AboutPage } from './pages/AboutPage';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-200/50">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'comic/:id', element: <DetailPage /> },
      { path: 'collection', element: <CollectionPage /> },
      { path: 'points', element: <PointsPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);