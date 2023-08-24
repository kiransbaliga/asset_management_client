import { FC, ReactNode, useEffect, useState } from 'react';
import { classNames } from '../../utils/funcs';
import { STAGES } from './consts';
import usePrevious from '../../hooks/previous.hook';

interface TransitionProps {
  show: boolean;
  startFrom?: string;
  startTo?: string;
  endFrom?: string;
  endTo?: string;
  afterEnd?: () => void;
  className?: string;
  children: ReactNode;
  style?: object;
  duration: number;
}

const Transition: FC<TransitionProps> = ({
  show,
  startFrom,
  startTo,
  endFrom,
  endTo,
  className,
  children,
  style,
  duration,
  afterEnd = () => {}
}) => {
  const [stage, setStage] = useState(STAGES.INIT);
  const prevShow = usePrevious(show);

  const transitionClassName = {
    [STAGES.INIT]: '',
    [STAGES.BEFORE_START]: startFrom,
    [STAGES.AFTER_START]: startTo,
    [STAGES.BEFORE_END]: endFrom,
    [STAGES.AFTER_END]: endTo
  }[stage];

  useEffect(() => {
    if (prevShow === false && show === true) setStage(STAGES.BEFORE_START);
    else if (prevShow === true && show === false) setStage(STAGES.BEFORE_END);
  }, [show]);

  useEffect(() => {
    switch (stage) {
      case STAGES.BEFORE_START:
        setTimeout(() => {
          setStage(STAGES.AFTER_START);
        }, 0);
        break;
      case STAGES.BEFORE_END:
        setTimeout(() => {
          setStage(STAGES.AFTER_END);
        }, 0);
        break;
      case STAGES.AFTER_END:
        setTimeout(() => {
          afterEnd();
        }, duration);
        break;
    }
  }, [stage]);

  return (
    <div
      className={classNames(className, transitionClassName)}
      style={{ ...style, transition: `all ${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default Transition;
