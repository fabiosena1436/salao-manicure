
import { useState } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '../../../components/Button';
import {
  FormOverlay,
  FormContainer,
  FormHeader,
  FormBody,
  FormGroup,
  Label,
  Input,
  TextArea,
  ImagePreview,
  CloseButton,
  ButtonGroup
} from './ProductForm.styles';

export const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: '',
    ...product
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        imageUrl: formData.imageUrl,
        updatedAt: new Date().toISOString()
      };

      if (product?.id) {
       
        await updateDoc(doc(db, 'products', product.id), productData);
      } else {
       
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date().toISOString()
        });
      }

      onSave();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormOverlay>
      <FormContainer>
        <FormHeader>
          <h2>{product ? 'Editar Produto' : 'Novo Produto'}</h2>
          <CloseButton onClick={onClose}>
            <AiOutlineClose />
          </CloseButton>
        </FormHeader>

        <FormBody onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome do Produto</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Descrição</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Categoria</Label>
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>URL da Imagem</Label>
            <Input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
              required
            />
          </FormGroup>

          {formData.imageUrl && (
            <FormGroup>
              <Label>Preview da Imagem</Label>
              <ImagePreview>
                <img src={formData.imageUrl} alt="Preview" />
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                >
                  <AiOutlineClose />
                </button>
              </ImagePreview>
            </FormGroup>
          )}

          <FormGroup>
            <Label>Preço</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Estoque</Label>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </ButtonGroup>
        </FormBody>
      </FormContainer>
    </FormOverlay>
  );
};