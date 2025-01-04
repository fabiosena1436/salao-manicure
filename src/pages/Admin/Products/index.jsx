// src/pages/Admin/Products/index.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useNotification } from '../../../contexts/NotificationContext';
import { 
  AiOutlinePlus, 
  AiOutlineEdit, 
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineFilter
} from 'react-icons/ai';
import { Button } from '../../../components/Button';
import { ProductForm } from './ProductForm';
import {
  Container,
  Header,
  SearchSection,
  SearchBar,
  FilterDropdown,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductActions,
  EmptyState,
  LoadingState,
  ConfirmDialog
} from './styles';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      showError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteDoc(doc(db, 'products', productToDelete.id));
      showSuccess('Produto excluído com sucesso!');
      await loadProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      showError('Erro ao excluir produto');
    } finally {
      setShowConfirmDelete(false);
      setProductToDelete(null);
    }
  };

  const getCategories = () => {
    const categories = new Set(products.map(product => product.category));
    return ['all', ...Array.from(categories)];
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingState>Carregando produtos...</LoadingState>;
  }

  return (
    <Container>
      <Header>
        <h1>Gerenciar Produtos</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <AiOutlinePlus />
          Novo Produto
        </Button>
      </Header>

      <SearchSection>
        <SearchBar>
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <FilterDropdown>
          <AiOutlineFilter />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {getCategories().map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas as Categorias' : category}
              </option>
            ))}
          </select>
        </FilterDropdown>
      </SearchSection>

      {filteredProducts.length > 0 ? (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>
                <img src={product.imageUrl} alt={product.name} />
              </ProductImage>
              <ProductInfo>
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
                <p className="stock">
                  Estoque: {product.stock} unidades
                </p>
              </ProductInfo>
              <ProductActions>
                <Button onClick={() => handleEdit(product)}>
                  <AiOutlineEdit />
                  Editar
                </Button>
                <Button 
                  $variant="danger"
                  onClick={() => handleDelete(product)}
                >
                  <AiOutlineDelete />
                  Excluir
                </Button>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductsGrid>
      ) : (
        <EmptyState>
          <p>Nenhum produto encontrado</p>
        </EmptyState>
      )}

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedProduct(null);
          }}
          onSave={() => {
            loadProducts();
            setIsFormOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showConfirmDelete && (
        <ConfirmDialog>
          <div className="content">
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir o produto "{productToDelete?.name}"?
              Esta ação não pode ser desfeita.
            </p>
            <div className="actions">
              <Button 
                $variant="secondary"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </Button>
              <Button 
                $variant="danger"
                onClick={confirmDelete}
              >
                Confirmar Exclusão
              </Button>
            </div>
          </div>
        </ConfirmDialog>
      )}
    </Container>
  );
};