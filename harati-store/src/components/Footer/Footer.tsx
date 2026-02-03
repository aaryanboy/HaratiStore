import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.column}>
          <h3 className={styles.brand}>Harati Store</h3>
          <p className={styles.text}>
            Weaving heritage into modern elegance. 
            Timeless fashion for the royal spirit.
          </p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Shop</h4>
          <ul className={styles.list}>
            <li><a href="#" className={styles.link}>New Arrivals</a></li>
            <li><a href="#" className={styles.link}>Bridal Collection</a></li>
            <li><a href="#" className={styles.link}>Sarees</a></li>
            <li><a href="#" className={styles.link}>Accessories</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Service</h4>
          <ul className={styles.list}>
            <li><a href="#" className={styles.link}>Contact Us</a></li>
            <li><a href="#" className={styles.link}>Shipping & Returns</a></li>
            <li><a href="#" className={styles.link}>Size Guide</a></li>
            <li><a href="#" className={styles.link}>Book a Virtual Appointment</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Newsletter</h4>
          <p className={styles.text}>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Your email address" className={styles.input} />
            <button className={styles.button}>Subscribe</button>
          </div>
        </div>

      </div>
      
      <div className={styles.bottomBar}>
        <div className="container">
           <p className={styles.copyright}>&copy; {new Date().getFullYear()} Harati Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
