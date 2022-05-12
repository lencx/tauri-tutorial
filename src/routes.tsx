import { RouteObject, useRoutes } from 'react-router-dom';

import DrawView from '@views/draw';
import DashboardView from '@views/dashboard';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardView />,
  },
  {
    path: '/draw',
    element: <DrawView />,
  },
];

export default () => useRoutes(routes);
