import { useState, useEffect } from 'react';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { MdShoppingCart } from 'react-icons/md';
import { Button } from '../Button';
import { ProductDetailsModal } from '../ProductDetails';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import {
  ProductsContainer,
  ProductsTitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ViewAllButton
} from './styles';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const { showSuccess } = useNotification();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      // Usando limit(4) para mostrar apenas 4 produtos em destaque
      const q = query(productsRef, limit(4));
      const querySnapshot = await getDocs(q);
      
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Previne a abertura do modal
    addToCart(product);
    showSuccess('Produto adicionado ao carrinho!');
  };

  const handleViewAllProducts = () => {
    window.location.href = '/store';
  };

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <ProductsContainer>
      <ProductsTitle>Destaques da Loja</ProductsTitle>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            onClick={() => setSelectedProduct(product)}
          >
            <ProductImage 
              src={product.imageUrl} 
              alt={product.name} 
            />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </ProductPrice>
              <Button onClick={(e) => handleAddToCart(product, e)}>
                <MdShoppingCart size={20} />
                Adicionar
              </Button>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
      
      <ViewAllButton>
        <Button variant="secondary" onClick={handleViewAllProducts}>
          Ver Todos os Produtos
        </Button>
      </ViewAllButton>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            addToCart(product);
            showSuccess('Produto adicionado ao carrinho!');
            setSelectedProduct(null);
          }}
        />
      )}
    </ProductsContainer>
  );
};