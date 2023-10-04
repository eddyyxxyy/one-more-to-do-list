import { IInputProps } from '../types';

import styles from './Input.module.css';

export function Input({ ...rest }: IInputProps) {
  return <input className={styles.input} {...rest} />;
}
