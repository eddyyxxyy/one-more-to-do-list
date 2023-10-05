import { FormEvent } from 'react';

import { Button } from './Button';

import { CloudSlash, SmileySad } from '@phosphor-icons/react';

import { IConfirmationModalProps } from '../types';

import styles from './ConfirmationModal.module.css';

export function ConfirmationModal({
  title,
  text,
  setModalIsOpen,
  isOpen = false,
}: IConfirmationModalProps) {
  function handleConfirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setModalIsOpen(false);
  }

  return (
    <div className={!isOpen ? styles.hidden : styles.wrapper}>
      <form className={styles.modal} onSubmit={handleConfirm}>
        <h2>{title}</h2>
        <CloudSlash size={60} />
        <p>{text}</p>
        <Button
          type="submit"
          text="Entendi"
          icon={SmileySad}
          iconSize={20}
          iconWeight="bold"
        />
      </form>
    </div>
  );
}
