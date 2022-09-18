import { useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import DashboardView from '@/views/dashboard';
import CanvasView from '@/views/canvas';
import CanvasPaperView from '@/views/canvas/paper';
import GameOfLifeView from '@/views/game_of_life';
import MdHub from '@/views/mdhub';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardView />,
  },
  {
    path: 'tools/canvas',
    element: <CanvasView />,
  },
  {
    path: 'tools/canvas/paper/:path/:file',
    element: <CanvasPaperView />,
  },
  {
    path: '/tools/mdhub',
    element: <MdHub />,
  },
  {
    path: 'game/game-of-life',
    element: <GameOfLifeView />,
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
