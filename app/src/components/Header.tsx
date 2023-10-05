import rocketIcon from '../assets/rocket-icon.svg';

import { GithubLogo } from '@phosphor-icons/react';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <a
        href="https://github.com/eddyyxxyy/one-more-to-do-list"
        aria-label="Código fonte da aplicação no Github"
        title="Código fonte da aplicação no Github"
        rel="noreferrer"
        target="_blank"
      >
        <img src={rocketIcon} alt="Ícone de um foguete sendo lançado" />
        <h1>
          to<span>do</span>
        </h1>
        <GithubLogo
          className={styles.githubLogo}
          size={24}
          color="var(--blue-300)"
        />
      </a>
    </header>
  );
}
