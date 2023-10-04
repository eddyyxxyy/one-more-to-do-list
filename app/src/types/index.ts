import { ButtonHTMLAttributes, ComponentType, Dispatch, FormEventHandler } from 'react';

import { IconProps, IconWeight } from '@phosphor-icons/react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ComponentType<IconProps> | undefined;
  iconSize?: number;
  iconWeight?: IconWeight;
}

export interface ITask {
  id: string;
  description: string;
  isFinished: boolean;
}

export interface IConfirmationModalProps {
  title: string;
  text: string;
  isOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}
