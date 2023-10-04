import { IButtonProps } from '../types';

import styles from './Button.module.css';

export function Button({
  text,
  icon: Icon = undefined,
  iconSize = 16,
  iconWeight = 'regular',
  ...rest
}: IButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {text} {Icon && <Icon size={iconSize} weight={iconWeight} />}
    </button>
  );
}
