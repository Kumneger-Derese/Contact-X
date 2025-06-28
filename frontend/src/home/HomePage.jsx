import HomeNav from './HomeNav';
import Features from './Fetures';
import Hero from './Hero';
import Footer from './Footer';
import Product from './Product';
import CTA from './CTA';

export default function HomePage() {
  return (
    <div id='home'>
      <HomeNav />
      <Hero />
      <Features />
      <Product />
      <CTA />
      <Footer />
    </div>
  );
}
