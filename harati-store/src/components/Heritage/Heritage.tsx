import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Heritage.module.css';
import detailImage from '../../assets/images/luxury_collection_detail_1770107341274.png';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Heritage: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={elementRef}
      className={`${styles.section} ${isVisible ? 'animate-fade-in' : ''}`}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out' }}
    >
      <div className={`container ${styles.container}`}>
        <div className={styles.imageWrapper}>
          <img src={detailImage} alt="Intricate Embroidery Detail" className={styles.image} />
        </div>
        <div className={styles.content}>
          <span className={styles.label}>Our Heritage</span>
          <h2 className={styles.title}>The Art of Time</h2>
          <p className={styles.text}>
            Harati Store is more than a fashion house; it is a custodian of legacy. 
            born from the royal corridors of tradition, every weave tells a story of 
            artisans who have dedicated their lives to the perfection of the craft.
          </p>
          <p className={styles.text}>
            We believe in the quiet confidence of quality. Our collections are curated 
            for those who understand that true luxury lies in the details—the whisper 
            of silk, the weight of gold zari, and the timeless elegance of heritage.
          </p>
          <Link to="/story" className={styles.button}>Read Our Story</Link>
        </div>
      </div>
    </section>
  );
};

export default Heritage;
