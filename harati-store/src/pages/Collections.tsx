import React from 'react';
import Layout from '../components/Layout/Layout';
import CollectionGrid from '../components/CollectionPreview/CollectionGrid';
import styles from './PageStyles.module.css';

const Collections: React.FC = () => {
  return (
    <Layout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Our Collections</h1>
        <p className={styles.pageSubtitle}>Curated for the Connoisseur</p>
      </div>
      <CollectionGrid />
    </Layout>
  );
};

export default Collections;
