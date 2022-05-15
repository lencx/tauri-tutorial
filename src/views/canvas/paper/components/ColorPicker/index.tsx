import { useFloating } from '@floating-ui/react-dom';

const ColorPicker = () => {
  const { x, y, reference, floating, strategy } = useFloating();

  return (
    <div>
      <button ref={reference}>color</button>
      <div
        ref={floating}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
        }}
      >
        Tooltip
      </div>
    </div>
  );
};

export default ColorPicker;
