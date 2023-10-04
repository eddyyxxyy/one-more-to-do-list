import { PlusCircle } from '@phosphor-icons/react';
import { IButtonProps } from '../types';

import styles from './ButtonPlus.module.css';

export function ButtonPlus({ text, ...rest }: IButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {text} <PlusCircle size={16} />
    </button>
  );
}
