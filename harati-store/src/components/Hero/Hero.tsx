import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.content}>
        <span className={styles.subtitle}>Estd. 2024</span>
        <h1 className={styles.title}>
          Harati<br />Store
        </h1>
        <div className={styles.divider}>
            <span className={styles.diamond}></span>
        </div>
        <p className={styles.tagline}>
          The Royal Collection
        </p>
        <p className={styles.description}>
          Curated elegance for the modern connoisseur. <br/>
          Experience the heritage of handwoven luxury.
        </p>
        <div className={styles.actions}>
            <button className={styles.ctaButtonPrimary}>Shop Collection</button>
            <button className={styles.ctaButtonSecondary}>Our Story</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
