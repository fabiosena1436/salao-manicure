import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineWhatsApp
} from 'react-icons/ai';
import {
  CheckoutContainer,
  CheckoutContent,
  OrderSummary,
  FormSection,
  FormGroup,
  Label,
  InputContainer,
  InputIcon,
  InputField,
  OrderItems,
  OrderItem,
  ItemImage,
  ItemInfo,
  OrderTotal,
  SubmitButton,
  BackToStoreButton
} from './styles';

export const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const { showError } = useNotification();

  // Número do WhatsApp do vendedor (substitua pelo número real)
  const WHATSAPP_NUMBER = "";

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cart.length === 0) {
    navigate('/store');
    return null;
  }

  const formatOrderDetails = () => {
    const orderItems = cart.map(item => 
      `\n- ${item.name} (${item.quantity}x) - ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    ).join('');

    const total = getCartTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const message = `Novo Pedido:\n\n` +
      `Cliente: ${user.name || 'Não informado'}\n` +
      `Telefone: ${user.phone || 'Não informado'}\n` +
      `Email: ${user.email}\n` +
      `Endereço de Entrega: ${user.address || 'Não informado'}\n\n` +
      `Itens do Pedido:${orderItems}\n\n` +
      `Total do Pedido: ${total}`;

    return encodeURIComponent(message);
};

  const handleSubmitOrder = () => {
    try {
      const message = formatOrderDetails();
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      
      window.open(whatsappUrl, '_blank');
      clearCart();
      navigate('/store');
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      showError('Erro ao processar pedido. Tente novamente.');
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutContent>
        <FormSection>
          <h2>Confirme seus Dados</h2>
          <FormGroup>
            <Label>Nome</Label>
            <InputContainer>
              <InputIcon>
                <AiOutlineUser />
              </InputIcon>
              <InputField
                type="text"
                value={user.name || ''}
                disabled
              />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <InputContainer>
              <InputIcon>
                <AiOutlineMail />
              </InputIcon>
              <InputField
                type="email"
                value={user.email || ''}
                disabled
              />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <Label>Telefone</Label>
            <InputContainer>
              <InputIcon>
                <AiOutlinePhone />
              </InputIcon>
              <InputField
                type="tel"
                value={user.phone || ''}
                disabled
              />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <Label>Endereço de Entrega</Label>
            <InputContainer>
              <InputIcon>
                <AiOutlineEnvironment />
              </InputIcon>
              <InputField
                type="text"
                value={user.address || ''}
                disabled
              />
            </InputContainer>
          </FormGroup>

          <SubmitButton onClick={handleSubmitOrder}>
            <AiOutlineWhatsApp /> Enviar Pedido pelo WhatsApp
          </SubmitButton>

          <BackToStoreButton onClick={() => navigate('/store')}>
            Continuar Comprando
          </BackToStoreButton>
        </FormSection>

        <OrderSummary>
          <h2>Resumo do Pedido</h2>
          <OrderItems>
            {cart.map(item => (
              <OrderItem key={item.id}>
                <ItemImage>
                  <img src={item.imageUrl} alt={item.name} />
                </ItemImage>
                <ItemInfo>
                  <h4>{item.name}</h4>
                  <p>Quantidade: {item.quantity}</p>
                  <p className="price">
                    {(item.price * item.quantity).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </ItemInfo>
              </OrderItem>
            ))}
          </OrderItems>
          <OrderTotal>
            <span>Total:</span>
            <strong>
              {getCartTotal().toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </strong>
          </OrderTotal>
        </OrderSummary>
      </CheckoutContent>
    </CheckoutContainer>
  );
};