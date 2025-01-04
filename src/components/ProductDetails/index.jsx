// src/components/ProductDetails/index.jsx
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import { 
  AiOutlineClose, 
  AiOutlineMinus, 
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineShareAlt
} from 'react-icons/ai';
import {
  Modal,
  ModalContent,
  CloseButton,
  ProductContainer,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductCategory,
  ProductPrice,
  ProductDescription,
  QuantitySelector,
  AddToCartButton,
  ActionButtons,
  ActionButton,
  ProductDetails,
  ProductSize,
  SizeOption,
  ColorOption,
  ColorOptions
} from './styles';

export const ProductDetailsModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { showSuccess } = useNotification();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product.hasSize && !selectedSize) {
      showError('Por favor, selecione um tamanho');
      return;
    }

    if (product.hasColor && !selectedColor) {
      showError('Por favor, selecione uma cor');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    showSuccess('Produto adicionado ao carrinho!');
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    }
  };

  // Tamanhos disponíveis para lingerie
  const sizes = ['P', 'M', 'G', 'GG'];
  
  // Cores disponíveis
  const colors = [
    { name: 'Preto', value: '#000000' },
    { name: 'Branco', value: '#FFFFFF' },
    { name: 'Rosa', value: '#FFC0CB' },
    { name: 'Vermelho', value: '#FF0000' }
  ];

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>

        <ProductContainer>
          <ProductImage>
            <img src={product.imageUrl} alt={product.name} />
          </ProductImage>

          <ProductInfo>
            <ProductCategory>{product.category}</ProductCategory>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </ProductPrice>

            <ProductDescription>{product.description}</ProductDescription>

            {product.hasSize && (
              <ProductDetails>
                <h3>Tamanho</h3>
                <ProductSize>
                  {sizes.map(size => (
                    <SizeOption
                      key={size}
                      $selected={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </SizeOption>
                  ))}
                </ProductSize>
              </ProductDetails>
            )}

            {product.hasColor && (
              <ProductDetails>
                <h3>Cor</h3>
                <ColorOptions>
                  {colors.map(color => (
                    <ColorOption
                      key={color.name}
                      $color={color.value}
                      $selected={selectedColor === color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    />
                  ))}
                </ColorOptions>
              </ProductDetails>
            )}

            <ProductDetails>
              <h3>Quantidade</h3>
              <QuantitySelector>
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <AiOutlineMinus />
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <AiOutlinePlus />
                </button>
              </QuantitySelector>
            </ProductDetails>

            <AddToCartButton onClick={handleAddToCart}>
              <AiOutlineShoppingCart />
              Adicionar ao Carrinho
            </AddToCartButton>

            <ActionButtons>
              <ActionButton>
                <AiOutlineHeart />
                Favoritar
              </ActionButton>
              <ActionButton onClick={handleShare}>
                <AiOutlineShareAlt />
                Compartilhar
              </ActionButton>
            </ActionButtons>
          </ProductInfo>
        </ProductContainer>
      </ModalContent>
    </Modal>
  );
};