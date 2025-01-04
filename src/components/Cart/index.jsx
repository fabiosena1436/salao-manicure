// src/components/Cart/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import {
  AiOutlineShoppingCart,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineClose
} from 'react-icons/ai';
import {
  CartContainer,
  CartButton,
  CartCount,
  CartPanel,
  CartHeader,
  CartItems,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemQuantity,
  ItemPrice,
  RemoveButton,
  CartFooter,
  CartTotal,
  CheckoutButton,
  EmptyCart
} from './styles';

export const Cart = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount
  } = useCart();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/client/checkout');
  };

  return (
    <CartContainer>
      <CartButton onClick={() => setIsOpen(true)}>
        <AiOutlineShoppingCart />
        {getCartCount() > 0 && (
          <CartCount>{getCartCount()}</CartCount>
        )}
      </CartButton>

      {isOpen && (
        <CartPanel>
          <CartHeader>
            <h3>Carrinho</h3>
            <button onClick={() => setIsOpen(false)}>
              <AiOutlineClose />
            </button>
          </CartHeader>

          {cart.length > 0 ? (
            <>
              <CartItems>
                {cart.map(item => (
                  <CartItem key={item.id}>
                    <ItemImage>
                      <img src={item.imageUrl} alt={item.name} />
                    </ItemImage>
                    <ItemInfo>
                      <h4>{item.name}</h4>
                      <p>{item.category}</p>
                      <ItemPrice>
                        {item.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </ItemPrice>
                    </ItemInfo>
                    <ItemQuantity>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <AiOutlineMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AiOutlinePlus />
                      </button>
                    </ItemQuantity>
                    <RemoveButton onClick={() => removeFromCart(item.id)}>
                      <AiOutlineClose />
                    </RemoveButton>
                  </CartItem>
                ))}
              </CartItems>

              <CartFooter>
                <CartTotal>
                  <span>Total:</span>
                  <strong>
                    {getCartTotal().toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </strong>
                </CartTotal>
                <CheckoutButton onClick={handleCheckout}>
                  Finalizar Compra
                </CheckoutButton>
              </CartFooter>
            </>
          ) : (
            <EmptyCart>
              <p>Seu carrinho está vazio</p>
            </EmptyCart>
          )}
        </CartPanel>
      )}
    </CartContainer>
  );
};