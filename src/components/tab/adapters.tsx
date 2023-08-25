import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Icon from '../icon';
import { classNames } from '../../utils/funcs';
import './style.css';

export interface IconTabAdapterProps {
  className?: string;
  label: string;
  icon: IconDefinition;
}

export function iconTabAdapter(isSelected: boolean, props: IconTabAdapterProps) {
  return (
    <div
      className={classNames('icon-tab', isSelected ? 'selected' : 'not-selected', props.className)}
    >
      <Icon icon={props.icon} />
      <div>{props.label}</div>
    </div>
  );
}
