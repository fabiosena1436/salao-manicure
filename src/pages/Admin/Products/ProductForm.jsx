// // src/pages/Admin/Products/ProductForm.jsx
// import { useState, useEffect } from 'react';
// import { 
//   ref, 
//   uploadBytes, 
//   getDownloadURL 
// } from 'firebase/storage';
// import { 
//   collection, 
//   addDoc, 
//   doc, 
//   updateDoc 
// } from 'firebase/firestore';
// import { db, storage } from '../../../services/firebase';
// import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai';
// import { Button } from '../../../components/Button';
// import {
//   FormOverlay,
//   FormContainer,
//   FormHeader,
//   FormBody,
//   FormGroup,
//   Label,
//   Input,
//   TextArea,
//   ImagePreview,
//   ImageUploadButton,
//   CloseButton,
//   ButtonGroup
// } from './ProductForm.styles';

// export const ProductForm = ({ product, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     category: '',
//     imageUrl: '',
//     ...product
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(product?.imageUrl || '');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let imageUrl = formData.imageUrl;

//       // Upload da imagem se uma nova foi selecionada
//       if (imageFile) {
//         const storageRef = ref(storage, `products/${imageFile.name}`);
//         const snapshot = await uploadBytes(storageRef, imageFile);
//         imageUrl = await getDownloadURL(snapshot.ref);
//       }

//       const productData = {
//         name: formData.name,
//         description: formData.description,
//         price: Number(formData.price),
//         stock: Number(formData.stock),
//         category: formData.category,
//         imageUrl,
//         updatedAt: new Date().toISOString()
//       };

//       if (product?.id) {
//         // Atualizar produto existente
//         await updateDoc(doc(db, 'products', product.id), productData);
//       } else {
//         // Criar novo produto
//         await addDoc(collection(db, 'products'), {
//           ...productData,
//           createdAt: new Date().toISOString()
//         });
//       }

//       onSave();
//     } catch (error) {
//       console.error('Erro ao salvar produto:', error);
//       alert('Erro ao salvar produto. Tente novamente.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FormOverlay>
//       <FormContainer>
//         <FormHeader>
//           <h2>{product ? 'Editar Produto' : 'Novo Produto'}</h2>
//           <CloseButton onClick={onClose}>
//             <AiOutlineClose />
//           </CloseButton>
//         </FormHeader>

//         <FormBody onSubmit={handleSubmit}>
//           <FormGroup>
//             <Label>Nome do Produto</Label>
//             <Input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label>Descrição</Label>
//             <TextArea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label>Categoria</Label>
//             <Input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label>Preço</Label>
//             <Input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               step="0.01"
//               min="0"
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label>Estoque</Label>
//             <Input
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               min="0"
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label>Imagem</Label>
//             {previewUrl ? (
//               <ImagePreview>
//                 <img src={previewUrl} alt="Preview" />
//                 <button type="button" onClick={() => {
//                   setPreviewUrl('');
//                   setImageFile(null);
//                 }}>
//                   <AiOutlineClose />
//                 </button>
//               </ImagePreview>
//             ) : (
//               <ImageUploadButton>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 <AiOutlineCloudUpload />
//                 <span>Upload Imagem</span>
//               </ImageUploadButton>
//             )}
//           </FormGroup>

//           <ButtonGroup>
//             <Button type="button" variant="secondary" onClick={onClose}>
//               Cancelar
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Salvando...' : 'Salvar'}
//             </Button>
//           </ButtonGroup>
//         </FormBody>
//       </FormContainer>
//     </FormOverlay>
//   );
// };

// src/pages/Admin/Products/ProductForm.jsx
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
        // Atualizar produto existente
        await updateDoc(doc(db, 'products', product.id), productData);
      } else {
        // Criar novo produto
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