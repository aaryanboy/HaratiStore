import React from 'react';
import Layout from '../components/Layout/Layout';
import Heritage from '../components/Heritage/Heritage';
import styles from './PageStyles.module.css';

const Story: React.FC = () => {
  return (
    <Layout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>The Harati Legacy</h1>
        <p className={styles.pageSubtitle}>A Journey Through Time and Tradition</p>
      </div>
      <Heritage />
      <section className="container" style={{ paddingBottom: 'var(--spacing-xxl)' }}>
        <p className={styles.textBlock}>
            Founded on the principles of purity and royalty, Harati Store has been a beacon of 
            traditional fashion for decades. Our journey began with a simple mission: to preserve 
            the dying art of hand-embroidery and bring it to the modern world.
        </p>
        <p className={styles.textBlock}>
            Each piece in our collection is not just a garment; it is a labor of love, crafted by 
            artisans whose skills have been passed down through generations. We source the finest 
            silks from Varanasi, the purest gold threads from Surat, and combine them with 
            contemporary designs to create masterpieces that transcend time.
        </p>
      </section>
    </Layout>
  );
};

export default Story;
