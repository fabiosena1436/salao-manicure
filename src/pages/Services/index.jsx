// src/pages/Services/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSpa, MdFaceUnlock } from 'react-icons/md';
import { BiWinkSmile } from "react-icons/bi";
import {
  ServicesPageContainer,
  ServicesHeader,
  ServicesGrid,
  ServiceCard,
  ServiceImage,
  ServiceInfo,
  ServiceTitle,
  ServiceDescription,
  ServicePrice,
  FilterSection,
  CategoryFilter
} from './styles';
import manicure1 from '../../assets/manicure1.jpg';
import depilaçoa1 from '../../assets/depilaçoa1.jpg';
import sombrancelhas1 from '../../assets/sombrancelhas1.jpg';

export const ServicesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 'manicure-pedicure',
      title: 'Manicure & Pedicure',
      description: 'Cuidados completos para suas unhas com os melhores produtos.',
      category: 'maos-pes',
      price: 'A partir de R$ 35,00',
      image: manicure1,
      icon: <MdSpa />
    },
    {
      id: 'depilacao',
      title: 'Depilação',
      description: 'Transforme seu visual com nossa depilação profissional.',
      category: 'corporal',
      price: 'A partir de R$ 25,00',
      image: depilaçoa1,
      icon: <BiWinkSmile />
    },
    {
      id: 'sobrancelhas',
      title: 'Designer de Sobrancelhas',
      description: 'Realce sua beleza natural com nossas técnicas exclusivas.',
      category: 'rosto',
      price: 'A partir de R$ 35,00',
      image: sombrancelhas1,
      icon: <MdFaceUnlock />
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'maos-pes', name: 'Mãos e Pés' },
    { id: 'corporal', name: 'Corporal' },
    { id: 'rosto', name: 'Rosto' }
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <ServicesPageContainer>
      <ServicesHeader>
        <h1>Nossos Serviços</h1>
        <p>Conheça todos os nossos serviços e escolha o melhor para você</p>
      </ServicesHeader>

      <FilterSection>
        <CategoryFilter>
          {categories.map(category => (
            <button
              key={category.id}
              className={selectedCategory === category.id ? 'active' : ''}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </CategoryFilter>
      </FilterSection>

      <ServicesGrid>
        {filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            onClick={() => navigate(`/servicos/${service.id}`)}
          >
            <ServiceImage>
              <img src={service.image} alt={service.title} />
              <div className="icon">{service.icon}</div>
            </ServiceImage>
            <ServiceInfo>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServicePrice>{service.price}</ServicePrice>
            </ServiceInfo>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesPageContainer>
  );
};