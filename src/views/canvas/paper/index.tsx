import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import GoBack from '@/components/GoBack';
import useFullCanvas from '@/hooks/useFullCanvas';
import { saveFile, getFile } from '@/system/fs';
import { CANVAS_ROOT } from '@/utils/constant';

import ToolPalette from './components/ToolPalette';
import { Brush } from './canvas';
import './index.scss';

const InitBrush = new Brush();

export default function CanvasPaperView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFullCanvas(canvasRef);
  const { path, file } = useParams();
  const filePath = `${CANVAS_ROOT}/${path}/${file}`;

  const handleImage = async () => {
    const data = await getFile(filePath);
    InitBrush.drawImage(data.content);
  };

  useEffect(() => {
    if (canvasRef.current) {
      InitBrush.init(canvasRef.current);
      handleImage();
    }
  }, []);

  const handleToolbar = (key: string, val: any) => {
    InitBrush.run(key, val);
  };

  const handleSave = () => {
    const image = InitBrush.save();
    saveFile(filePath, image);
  };

  const handleEraser = (isEraser: boolean) => {
    InitBrush.eraser(isEraser);
  };

  return (
    <div className="omb-canvas-paper">
      <GoBack />
      <ToolPalette
        onChange={handleToolbar}
        onEraser={handleEraser}
        onSave={handleSave}
      />
      <canvas ref={canvasRef} className="select-none" />
    </div>
  );
}
