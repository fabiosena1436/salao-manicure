// src/components/Services/index.jsx
import { MdSpa,  MdFaceUnlock } from 'react-icons/md'; // Usando Material Icons
import { BiWinkSmile } from "react-icons/bi";
import {
  ServicesContainer,
  ServicesTitle,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription
} from './styles';

// src/components/Services/index.jsx
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 'manicure-pedicure',
      icon: <MdSpa />,
      title: 'Manicure & Pedicure',
      description: 'Cuidados completos para suas unhas com os melhores produtos.',
      images: [
        '/images/manicure1.jpg',
        '/images/manicure2.jpg',
        '/images/manicure3.jpg',
      ]
    },
    {
      id: 'depilacao',
      icon: <BiWinkSmile />,
      title: 'Depilação',
      description: 'Transforme seu visual',
      images: [
        '/images/depilacao1.jpg',
        '/images/depilacao2.jpg',
        '/images/depilacao3.jpg',
      ]
    },
    {
      id: 'sobrancelhas',
      icon: <MdFaceUnlock />,
      title: 'Designer de Sobrancelhas',
      description: 'Tratamentos especiais para sua beleza.',
      images: [
        '/images/sobrancelhas1.jpg',
        '/images/sobrancelhas2.jpg',
        '/images/sobrancelhas3.jpg',
      ]
    }
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/servicos/${serviceId}`);
  };

  return (
    <ServicesContainer>
      <ServicesTitle>Nossos Serviços</ServicesTitle>
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            onClick={() => handleServiceClick(service.id)}
          >
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};