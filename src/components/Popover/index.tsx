import { cloneElement, useState } from 'react';
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import './index.scss';

interface PopoverProps {
  children: JSX.Element;
  placement?: Placement;
  className?: string;
  render: (data: { id: string; close: () => void }) => React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  render,
  placement,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift()],
    placement,
    whileElementsMounted: autoUpdate,
  });

  const id = useId();

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <AnimatePresence>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={false}
            order={['reference', 'content']}
            returnFocus={false}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              {...getFloatingProps({
                className: clsx(className, 'omb-popover'),
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? '',
                  left: x ?? '',
                },
              })}
            >
              {render({
                id,
                close: () => {
                  setOpen(false);
                },
              })}
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </>
  );
};

export default Popover;
