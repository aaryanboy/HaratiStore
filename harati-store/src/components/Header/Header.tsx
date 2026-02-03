import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/collections" className={styles.navLink}>Collections</Link>
          <Link to="/story" className={styles.navLink}>Our Story</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </nav>
        
        <div className={styles.logo}>
          <Link to="/">HaratiStore</Link>
        </div>

        {/* Cart and Search removed as per user request for "Boutique Showroom" mode */}
        <div className={styles.actions}>
           {/* Placeholder for future boutique actions if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
