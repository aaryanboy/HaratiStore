import React from 'react';
import styles from './Spotlight.module.css';
import spotlightImage from '../../assets/images/luxury_saree_model_gold_1770107327263.png';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Spotlight: React.FC = () => {
    const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
        ref={elementRef}
        className={`${styles.spotlight} ${isVisible ? 'animate-fade-in' : ''}`}
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
    >
      <div className={styles.imageOverlay}>
        <img src={spotlightImage} alt="Spotlight Collection" className={styles.image} />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <span className={styles.label}>Exclusive Preview</span>
        <h2 className={styles.title}>The Golden Hour Edition</h2>
        <p className={styles.text}>
            Inspired by the palaces of Rajasthan, this limited edition collection features 
            pure gold zari woven into the finest Mulberry silk. A masterpiece of craftsmanship 
            waiting to be adorned.
        </p>
        <button className={styles.button}>View Lookbook</button>
      </div>
    </section>
  );
};

export default Spotlight;
