// src/pages/Home/index.jsx
import { Banner } from '../../components/Banner';
import { Services } from '../../components/Services';
import { Products } from '../../components/Products';
import { Newsletter } from '../../components/Newsletter';
import { Container } from './styles';

export const Home = () => {
  return (
    <Container>
      <Banner />
      <Services />
      <Products />
      <Newsletter />
    </Container>
  );
};