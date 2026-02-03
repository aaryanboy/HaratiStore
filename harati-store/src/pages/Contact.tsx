import React from 'react';
import Layout from '../components/Layout/Layout';
import styles from './PageStyles.module.css';

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Visit Our Showroom</h1>
        <p className={styles.pageSubtitle}>Experience Luxury in Person</p>
      </div>
      
      <section className={`container ${styles.contactContainer}`}>
        <div className={styles.contactInfo}>
            <h2 className={styles.sectionHeading}>Appointments</h2>
            <p className={styles.textBlock}>
                We invite you to experience our collection in the privacy of our boutique showroom. 
                Please schedule an appointment for a personalized consultation with our stylists.
            </p>
            <div className={styles.details}>
                <p><strong>Address:</strong> 123 Heritage Lane, Kathmandu, Nepal</p>
                <p><strong>Phone:</strong> +977 1 444 5555</p>
                <p><strong>Email:</strong> concierge@haratistore.com</p>
            </div>
        </div>

        <form className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input type="text" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input type="email" className={styles.input} />
            </div>
             <div className={styles.formGroup}>
                <label className={styles.label}>Phone</label>
                <input type="tel" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Message / Date Request</label>
                <textarea className={styles.textarea} rows={5}></textarea>
            </div>
            <button type="submit" className={styles.button}>Request Appointment</button>
        </form>
      </section>
    </Layout>
  );
};

export default Contact;
