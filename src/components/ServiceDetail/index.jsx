// src/pages/ServiceDetail/index.jsx

import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import manicure1 from '../../assets/manicure1.jpg';
import manicure2 from '../../assets/manicure2.jpg';
import manicure3 from '../../assets/manicure3.jpg';
import depilaçoa1 from '../../assets/depilaçoa1.jpg';
import depilaçoa2 from '../../assets/depilaçoa2.jpg';
import depilaçoa3 from '../../assets/depilaçoa3.jpg';
import sombrancelhas1 from '../../assets/sombrancelhas1.jpg';
import sombrancelhas2 from '../../assets/sombrancelhas2.jpg';
import sombrancelhas3 from '../../assets/sombrancelhas3.jpg';

import {
  ServiceDetailContainer,
  ServiceHeader,
  ServiceTitle,
  ServiceDescription,
  GallerySection,
  GalleryGrid,
  GalleryImage,
  PriceSection,
  PriceCard,
  BookingSection
} from './styles';

const servicesData = {
  'manicure-pedicure': {
    title: 'Manicure & Pedicure',
    description: `Nosso serviço de Manicure e Pedicure oferece um tratamento completo para suas mãos e pés. 
    Utilizamos produtos de alta qualidade e técnicas profissionais para garantir o melhor resultado.
    
    Nossos serviços incluem:
    Corte e lixamento das unhas, Tratamento de cutículas, Hidratação, Esmaltação, Massagem relaxante`,
    images: [
        manicure1,
        manicure2,
        manicure3
    ],
    prices: [
      { service: 'Manicure', price: 35 },
      { service: 'Pedicure', price: 45 },
      { service: 'Combo Manicure + Pedicure', price: 70 },
    ]
  },
  'depilacao': {
    title: 'Depilação',
    description: `Oferecemos serviços de depilação profissional com cera quente e fria. 
    Nossa equipe é altamente treinada para proporcionar o máximo conforto e resultados duradouros.
    
    Áreas disponíveis:
    Pernas completas, Axilas, Virilha, Buço, Costas e Braços`,
    images: [
        depilaçoa1,
        depilaçoa2,
        depilaçoa3
    ],
    prices: [
      { service: 'Pernas Completas', price: 80 },
      { service: 'Axilas', price: 25 },
      { service: 'Virilha Completa', price: 65 },
    ]
  },
  'sobrancelhas': {
    title: 'Designer de Sobrancelhas',
    description: `Design profissional de sobrancelhas para realçar sua beleza natural. 
    Utilizamos técnicas modernas e produtos de primeira linha para um resultado perfeito.
    
    Nossos serviços incluem: 
    Análise do formato do rosto, Design personalizado, Correção de assimetrias, Coloração, Henna`,
    images: [
      sombrancelhas1,
      sombrancelhas2,
      sombrancelhas3,
    ],
    prices: [
      { service: 'Design Simples', price: 35 },
      { service: 'Design com Henna', price: 55 },
      { service: 'Correção com Linha', price: 45 },
    ]
  }
};

export const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = servicesData[serviceId];

  if (!service) {
    return <div>Serviço não encontrado</div>;
  }

  const handleBooking = () => {
    navigate('/client/new-appointment');
  };

  

  return (
    <ServiceDetailContainer>
      <ServiceHeader>
        <ServiceTitle>{service.title}</ServiceTitle>
        <ServiceDescription>{service.description}</ServiceDescription>
      </ServiceHeader>

      <GallerySection>
        <h2>Galeria</h2>
        <GalleryGrid>
          {service.images.map((image, index) => (
            <GalleryImage key={index} src={image} alt={`${service.title} ${index + 1}`} />
          ))}
        </GalleryGrid>
      </GallerySection>

      <PriceSection>
        <h2>Preços</h2>
        <div className="price-grid">
          {service.prices.map((item, index) => (
            <PriceCard key={index}>
              <h3>{item.service}</h3>
              <p>{item.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}</p>
            </PriceCard>
          ))}
        </div>
      </PriceSection>

      <BookingSection>
        <Button onClick={handleBooking}>
          Agendar Horário
        </Button>
      </BookingSection>
    </ServiceDetailContainer>
  );
};