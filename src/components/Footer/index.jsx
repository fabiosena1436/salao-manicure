// src/components/Footer/index.jsx
import { Link } from 'react-router-dom';
import { 
  AiOutlinePhone, 
  AiOutlineMail, 
  AiOutlineEnvironment,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineWhatsApp 
} from 'react-icons/ai';

import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterList,
  FooterListItem,
  FooterContact,
  SocialLinks,
  SocialIcon,
  FooterBottom,
  FooterRights,
  FooterText
} from './styles';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Sobre Nós</FooterTitle>
          <FooterText>
            Oferecemos os melhores serviços de beleza e uma seleção exclusiva de lingerie
            para realçar sua beleza e autoestima.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <FooterList>
            <FooterListItem>
              <Link to="/servicos">Serviços</Link>
            </FooterListItem>
            <FooterListItem>
              <Link to="/store">Produtos</Link>
            </FooterListItem>
            <FooterListItem>
              <Link to="/client/new-appointment">Agendamento</Link>
            </FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <FooterContact>
            <FooterListItem>
              <AiOutlinePhone /> 
              <a href="tel:+55 18 99743-4894">(18) 99743-4894</a>
            </FooterListItem>
            <FooterListItem>
              <AiOutlineMail />
              <a href="mailto:contato@salaoelingerie.com">contato@salaoelingerie.com</a>
            </FooterListItem>
            <FooterListItem>
              <AiOutlineEnvironment />
              <address>Rua Example, 123 - São Paulo</address>
            </FooterListItem>
          </FooterContact>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Redes Sociais</FooterTitle>
          <SocialLinks>
            <SocialIcon href="" target="_blank" rel="noopener noreferrer">
              <AiFillFacebook size={24} />
            </SocialIcon>
            <SocialIcon href="" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram size={24} />
            </SocialIcon>
            <SocialIcon href="">
              <AiOutlineWhatsApp size={24} />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterRights>
          © {currentYear} Salão & Lingerie. Todos os direitos reservados (Fabio Sena)
        </FooterRights>
      </FooterBottom>
    </FooterContainer>
  );
};