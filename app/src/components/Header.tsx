import rocketIcon from '../assets/rocket-icon.svg';

import styles from './Header.module.css';

export function Header() {
  return (
    <div className={styles.header}>
      <div>
        <img src={rocketIcon} alt="Rocket launching icon" />{' '}
        <h1>
          to<span>do</span>
        </h1>
      </div>
    </div>
  );
}
