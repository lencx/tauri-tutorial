import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import GoBack from '@comps/GoBack';
import useFullCanvas from '@hooks/useFullCanvas';
import { Brush } from './canvas';
import ToolPalette from './components/ToolPalette';
import './index.scss';

const InitBrush = new Brush();

export default function CanvasPaperView(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFullCanvas(canvasRef);
  const { file } = useParams();

  useEffect(() => {
    canvasRef.current && InitBrush.init(canvasRef.current);
  }, []);

  const handleToolbar = (key: string, val: any) => {
    if (key === 'save') {
      const image = InitBrush.save();
      console.log(image);
      return;
    }
    if (key === 'eraser') {
      InitBrush.eraser();
    }
    InitBrush.run(key, val);
  };

  return (
    <div className="omb-canvas-paper">
      <GoBack />
      <ToolPalette onChange={handleToolbar} />
      <canvas ref={canvasRef} className="select-none" />
    </div>
  );
}
