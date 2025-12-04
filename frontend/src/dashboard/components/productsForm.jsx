import React, { useState, useEffect } from 'react';
import { Upload, DollarSign, Package } from 'lucide-react';
import axios from 'axios';

const ProductForm = ({ form, setForm, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: 0,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pré-remplir le formulaire si en mode édition
  useEffect(() => {
    if (form) {
      setFormData({
        name: form.name || '',
        description: form.description || '',
        price: form.price || '',
        category: form.category || '',
        stock: form.stock || 0,
      });
      if (form.image) setPreview(form.image);
    }
  }, [form]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append('image', image);
  
      let res;
      if (form?.id) {
        // édition
        res = await axios.put(`https://lfdsite.onrender.com/products/${form.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // création
        res = await axios.post('https://lfdsite.onrender.com/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      alert('✅ Produit enregistré avec succès !');
      if (onSave) onSave(res.data);
  
      // reset form
      setFormData({ name: '', description: '', price: '', category: '', stock: 0 });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert('❌ Erreur lors de l’enregistrement');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {form?.id ? 'Modifier le Produit' : 'Ajouter un Produit'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Image du produit</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
                <button
                  type="button"
                  onClick={() => { setImage(null); setPreview(null); }}
                  className="mt-4 text-red-600"
                >
                  Supprimer
                </button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto mb-2" size={48} />
                <label className="cursor-pointer text-blue-600 hover:underline">
                  Choisir une image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Nom du produit</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Prix (FCFA)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Catégorie</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ex: Thés, Huiles, Superfoods..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : form?.id ? 'Sauvegarder' : 'Créer le Produit'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Annuler
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProductForm;
