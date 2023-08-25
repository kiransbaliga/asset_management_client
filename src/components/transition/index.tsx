import { FC, ReactNode, useEffect, useState } from 'react';
import { classNames } from '../../utils/funcs';
import { STAGES } from './consts';
import usePrevious from '../../hooks/previous.hook';

interface TransitionProps {
  show: boolean;
  afterEnd?: () => void;
  className?: string;
  children: ReactNode;
  style?: object;
  duration: number;
}

const Transition: FC<TransitionProps> = ({
  show,
  className,
  children,
  style,
  duration,
  afterEnd = () => {}
}) => {
  const [stage, setStage] = useState(STAGES.INIT);
  const prevShow = usePrevious(show);

  [stage];

  useEffect(() => {
    if (prevShow === false && show === true) setStage(STAGES.START_FROM);
    else if (prevShow === true && show === false) setStage(STAGES.END_FROM);
  }, [show]);

  useEffect(() => {
    switch (stage) {
      case STAGES.START_FROM:
        setStage(STAGES.START_THROUGH);
        break;
      case STAGES.START_THROUGH:
        setStage(STAGES.START_TO);
        break;
      case STAGES.END_FROM:
        setStage(STAGES.END_THROUGH);
        break;
      case STAGES.END_THROUGH:
        setStage(STAGES.END_TO);
        break;
      case STAGES.END_TO:
        setTimeout(() => {
          afterEnd();
        }, duration);
        break;
    }
  }, [stage]);

  return (
    <div
      className={classNames(className, stage)}
      style={{ ...style, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default Transition;
