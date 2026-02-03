import React from 'react';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import CollectionGrid from '../components/CollectionPreview/CollectionGrid';
import Heritage from '../components/Heritage/Heritage';
import Spotlight from '../components/Spotlight/Spotlight';

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Heritage />
      <Spotlight />
      <CollectionGrid />
    </Layout>
  );
};

export default Home;
