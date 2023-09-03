import React, { useState, useEffect, useRef } from "react";
import { createProduct } from "../../api/productsAPI";

export type Product = {
  _id: string;
  SKU: number;
  receivedDate: Date;
  isAvailable: boolean;
  customerName: string;
  model: string;
  brand: string;
  location: string;
  category: string;
  year: number;
  exposureCounter: number;
  wholesalePrice: number;
  retailPrice: number;
  profit: number,
  description: string;
  imageUrl: string;
  image?: File;
};

interface ProductFormProps {
  product: Product;
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState<Product>({
    _id: product._id,
    SKU: product.SKU,
    receivedDate: new Date(product.receivedDate),
    isAvailable: product.isAvailable, // Generate a new SKU if no value provided.  Otherwise, use the provided value.  This is what
    customerName: product.customerName,
    model: product.model,
    brand: product.brand,
    location: product.location,
    category: product.category, // this is a required field, but it's not part of the schema.  it's just a placeholder for the user to fill in
    year: product.year,
    exposureCounter: product.exposureCounter,
    wholesalePrice: product.wholesalePrice,
    retailPrice: product.retailPrice,
    profit: product.profit,
    description: product.description,
    imageUrl: product.imageUrl,
  });
  // Initialize currentImage as null
const [currentImage, setCurrentImage] = useState<string | null>(product.imageUrl ? `http://127.0.0.1:4000/${product.imageUrl}` : null);
const imageRef = useRef<HTMLInputElement>(null);

// In the useEffect, only set currentImage when product.imageUrl is not an empty string
useEffect(() => {
  setFormData({
    _id: product._id,
    SKU: product.SKU,
    receivedDate: product.receivedDate,
    isAvailable: product.isAvailable,
    customerName: product.customerName,
    model: product.model,
    brand: product.brand,
    location: product.location,
    category: product.category, // this is a required field, but it's not part of the schema.  it's just a placeholder for the user to fill in,
    year: product.year,
    exposureCounter: product.exposureCounter,
    wholesalePrice: product.wholesalePrice,
    retailPrice: product.retailPrice,
    profit: product.profit,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  if (product.imageUrl) {
    setCurrentImage(`http://127.0.0.1:4000/${product.imageUrl}`);
  } else {
    setCurrentImage(null); // Reset to null if no image URL is available
  }
}, [product]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setFormData({
          ...formData,
          imageUrl: reader.result.toString(),
          image: file,
        });
        setCurrentImage(reader.result.toString());
      }
    };
  };


const handleFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  if (name === "receivedDate") {
    if (!isNaN(Date.parse(value))) {
      const date = new Date(value);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      setFormData({
        ...formData,
        [name]: date,
      });
    }
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};


  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

 // Type guard function to mimic Object.hasOwn
function hasOwn(obj: object, prop: string | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Initialize FormData object
  const formSubmitData = new FormData();
  
  // Populate FormData with values from the local state 'formData'
  for (const key in formData) {
    if (hasOwn(formData, key) && formData[key] !== null) {
      formSubmitData.append(key, formData[key]);
    }
  }
  
  // Validation: Check if FormData has essential keys like 'SKU' and 'model'
  if (formSubmitData.has('SKU') && formSubmitData.has('model')) {
    try {
      const response = await createProduct(formSubmitData);
      if (response) {
        // Handle success - you might want to reset the form or navigate to another page
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  } else {
    console.error('Error: Missing required product data');
  }
};


  return (
    <form className = "whitespace-nowrap mx-2 text-6xl" style={{ fontSize: '0.670rem' }} onSubmit={handleSubmit}>
        <label>
  Image:
  <input 
    type="file" 
    ref={imageRef}
    onChange={handleFile} 
    accept="image/*" // optional: this restricts the user to only be able to select image files
  />
</label>

      <label>
        SKU:
        <input type="number" name="SKU" value={formData.SKU} onChange={handleFormData} />
      </label>
      <label>
        Received Date:
        <input
  type="date"
  name="receivedDate"
  value={
    formData.receivedDate instanceof Date
      ? formData.receivedDate.toISOString().split("T")[0]
      : ""
  }
  onChange={event => {
    event.target.value = new Date(event.target.value).toISOString().split('T')[0];
    handleFormData(event);
  }}
/>

      </label>
       <label>
        Is Available:
        <input 
          type="checkbox" 
          name="isAvailable" 
          checked={formData.isAvailable} 
          onChange={handleCheckbox} 
        />
      </label>
      <label>
        Customer Name:
        <input type="text" name="customerName" value={formData.customerName} onChange={handleFormData} />
      </label>
      <label>
        Model:
        <input type="text" name="model" value={formData.model} onChange={handleFormData} />
      </label>
      <label>
        Brand:
        <input type="text" name="brand" value={formData.brand} onChange={handleFormData} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleFormData} />
      </label>
       <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleFormData} />
      </label>
      <label>
        Year:
        <input type="number" name="year" value={formData.year} onChange={handleFormData} />
      </label>
      <label>
        Exposure Counter:
        <input type="number" name="exposureCounter" value={formData.exposureCounter} onChange={handleFormData} />
      </label>
      <label>
        WholeSale Price:
        <input type="number" name="wholesalePrice" value={formData.wholesalePrice} onChange={handleFormData} />
      </label>
       <label>
        Retail Price:
        <input type="number" name="retailPrice" value={formData.retailPrice} onChange={handleFormData} />
      </label>
       <label>
        Profit:
        <input type="number" name="profit" value={formData.profit} onChange={handleFormData} />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleTextArea} />
      </label>
      {currentImage && (currentImage.startsWith('http://') || currentImage.startsWith('data:')) && (
  <img src={currentImage} alt="current" width="50px" height="50px" />
)}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;