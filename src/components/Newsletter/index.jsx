
import {
  NewsletterContainer,
  NewsletterContent,
  NewsletterTitle,
  NewsletterText,
  NewsletterMessage
} from './styles';

export const Newsletter = () => {
  
  return (
    <NewsletterContainer>
      <NewsletterContent>
        <NewsletterTitle>Fique por dentro das novidades</NewsletterTitle>
        <NewsletterText>
          Aqui voce encontra ofertas exclusivas!
        </NewsletterText>
        {status.message && (
          <NewsletterMessage $type={status.type}>
            {status.message}
          </NewsletterMessage>
        )}
      </NewsletterContent>
    </NewsletterContainer>
  );
};