import { useEffect, useRef } from 'react';

import './index.scss';

export default function CanvasPaperView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = document.body.clientWidth;
      canvasRef.current.height = document.body.clientHeight;
    }
  };

  useEffect(() => {
    getSize();
    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);

  return (
    <div className="omb-canvas-paper-view">
      <canvas ref={canvasRef} />
    </div>
  );
}
