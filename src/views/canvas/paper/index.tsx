import { useEffect, useRef } from 'react';

import { Paint } from './canvas';
import Toolbar from './components/ToolPalette';
import './index.scss';

const InitPaint = new Paint();

export default function CanvasPaperView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    getSize();
    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);

  useEffect(() => {
    canvasRef.current && InitPaint.init(canvasRef.current);
  }, []);

  const handleToolbar = (key: string, val: any) => {
    const fnMap = {
      color: 'setColor',
      lineWidth: 'setLineWidth',
    };
    // @ts-ignore
    InitPaint[fnMap[key]](val);
  };

  return (
    <div className="omb-canvas-paper-view">
      <Toolbar onChange={handleToolbar} />
      <canvas ref={canvasRef} />
    </div>
  );
}
