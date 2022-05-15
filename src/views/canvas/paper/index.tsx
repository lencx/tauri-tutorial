import { useEffect, useRef } from 'react';

import useFullCanvas from '@hooks/useFullCanvas';
import { Paint } from './canvas';
import Toolbar from './components/ToolPalette';
import './index.scss';

const InitPaint = new Paint();

export default function CanvasPaperView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFullCanvas(canvasRef);

  useEffect(() => {
    canvasRef.current && InitPaint.init(canvasRef.current);
  }, []);

  const handleToolbar = (key: string, val: any) => {
    if (key === 'save') {
      const image = InitPaint.save();
      console.log(image);
      return;
    }
    InitPaint.run(key, val);
  };

  return (
    <div className="omb-canvas-paper">
      <Toolbar onChange={handleToolbar} />
      <canvas ref={canvasRef} />
    </div>
  );
}
