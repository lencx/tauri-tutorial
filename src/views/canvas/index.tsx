import { useNavigate } from 'react-router-dom';

export default function CanvasView() {
  const go = useNavigate();

  const handleGoPaper = () => {
    go('/canvas/paper');
  };

  return (
    <div className="omb-canvas-view mt10">
      <div className="p10" onClick={handleGoPaper}>
        To Paper
      </div>
    </div>
  );
}
