import { ButtonHTMLAttributes, ComponentType } from 'react';

import { IconProps, IconWeight } from '@phosphor-icons/react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: ComponentType<IconProps>;
  iconSize: number;
  iconWeight: IconWeight;
}

export interface ITask {
  id: string;
  description: string;
  isFinished: boolean;
}
