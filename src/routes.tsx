import { useLayoutEffect } from 'react';
import { useLocation, RouteObject, useRoutes } from 'react-router-dom';

import DashboardView from '@views/dashboard';
import CanvasView from '@views/canvas';
import CanvasPaperView from '@/views/canvas/paper';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardView />,
  },
  {
    path: 'canvas',
    element: <CanvasView />,
  },
  {
    path: 'canvas/paper',
    element: <CanvasPaperView />,
  },
];

export default () => {
  const location = useLocation();
  const pathname = location.pathname;
  useLayoutEffect(() => {
    document.body.className =
      pathname.substring(1).replace(/\//gi, '_') + '_screen';
  }, [pathname]);
  return useRoutes(routes);
};
