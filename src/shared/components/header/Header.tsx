import styles from './Header.module.css';
import logotypeApp from '../../../assets/logotype.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img
        className={styles.logotype}
        src={logotypeApp}
      />
      <span className={styles.toColor}>to</span>
      <span className={styles.doColor}>do</span>
    </header>
  );
}