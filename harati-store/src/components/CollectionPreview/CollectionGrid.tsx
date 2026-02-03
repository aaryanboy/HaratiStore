import React from 'react';
import styles from './CollectionGrid.module.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Import images
import gallery1 from '../../assets/images/gallery_1.jpg';
import gallery2 from '../../assets/images/gallery_2.jpg';
import gallery3 from '../../assets/images/gallery_3.jpg';
import gallery4 from '../../assets/images/gallery_4.jpg';

const collections = [
  { 
    id: 1, 
    image: gallery1, 
    title: 'Bridal Heritage', 
    description: 'Adorn yourself in the timeless elegance of our bridal collection. Each thread tells a story of love and legacy.',
    link: '#' 
  },
  { 
    id: 2, 
    image: gallery2, 
    title: 'Royal Silks', 
    description: 'Experience the unmatched softness and sheen of pure royal silks, woven for those who demand nothing but the best.',
    link: '#' 
  },
  { 
    id: 3, 
    image: gallery3, 
    title: 'Festive Weaves', 
    description: 'Celebrate life’s special moments with our vibrant and intricate festive weaves that capture the spirit of joy.',
    link: '#' 
  },
  { 
    id: 4, 
    image: gallery4, 
    title: 'Contemporary Classics', 
    description: 'Where tradition meets modernity. Discover silhouettes that blend heritage craftsmanship with contemporary style.',
    link: '#' 
  },
];

const CollectionItem: React.FC<{ item: typeof collections[0]; index: number }> = ({ item, index }) => {
    const { elementRef, isVisible } = useScrollAnimation();
    const isEven = index % 2 === 0;

    return (
        <div 
            ref={elementRef}
            className={`${styles.item} ${isEven ? styles.itemEven : styles.itemOdd} ${isVisible ? 'animate-fade-in' : ''}`}
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
        >
            <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.title} className={styles.image} />
            </div>
            <div className={styles.content}>
                <span className={styles.number}>0{item.id}</span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                <a href={item.link} className={styles.link}>Explore Collection</a>
            </div>
        </div>
    );
};

const CollectionGrid: React.FC = () => {
  return (
    <section className={styles.collectionSection}>
      <div className={`container ${styles.headerContainer}`}>
          <h2 className={styles.sectionTitle}>Curated Collections</h2>
          <div className={styles.divider}></div>
      </div>
      
      <div className={styles.list}>
        {collections.map((item, index) => (
          <CollectionItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
