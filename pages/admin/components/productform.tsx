// 1.P.Form - Importing required modules
console.log("1.P.Form - Importing required modules");
import React, { useState, useEffect, useRef } from "react";

import { createProduct } from "../../api/productsAPI";

// 2.P.Form - Defining Product type
console.log("2.P.Form - Defining Product type");
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

// 3.P.Form - Defining ProductFormProps interface
console.log("3.P.Form - Defining ProductFormProps interface");
interface ProductFormProps {
  product: Product;
  onSubmit: (product: Product) => void;
}

// 4.P.Form - Defining ProductForm Component
console.log("4.P.Form - Defining ProductForm Component");
const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  
  // 5.P.Form - Initializing formData state
  console.log("5.P.Form - Initializing formData state");
  const [formData, setFormData] = useState<Product>(product);

  // 6.P.Form - Initializing currentImage state
  console.log("6.P.Form - Initializing currentImage state");
  const [, setCurrentImage] = useState<string | null>(product.imageUrl ? `http://127.0.0.1:4000/${product.imageUrl}` : null);

  // 7.P.Form - Initializing imageRef
  console.log("7.P.Form - Initializing imageRef");
  const imageRef = useRef<HTMLInputElement>(null);

  // 8.P.Form - Initializing thumbnailUrl state for displaying the thumbnail
  console.log("8.P.Form - Initializing thumbnailUrl state");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  // 9.P.Form - Defining useEffect for product dependency
  console.log("9.P.Form - Defining useEffect for product dependency");
  useEffect(() => {
    setFormData(product);
    if (product.imageUrl) {
      setCurrentImage(`http://127.0.0.1:4000/${product.imageUrl}`);
    } else {
      setCurrentImage(null);
    }
  }, [product]);

  // 10.P.Form - Handling file input change
const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("11.P.Form - Inside handleFile");
  const file = event.target.files?.[0];
  if (!file) {
    console.log("12.P.Form - No file selected");
    return;
  }
  console.log("13.P.Form - Reading the file for thumbnail");
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log("14.P.Form - File successfully read");
    if (reader.result) {
      setThumbnailUrl(reader.result as string);
      setFormData({
        ...formData,
        imageUrl: reader.result.toString(),
        image: file,
      });
      setCurrentImage(reader.result.toString());
    }
  };
};

  // 15.P.Form - Handling form data change
  console.log("15.P.Form - Handling form data change");
  const handleFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 16.P.Form - Handling textarea change
  console.log("16.P.Form - Handling textarea change");
  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 17.P.Form - Handling checkbox change
  console.log("17.P.Form - Handling checkbox change");
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // 18.P.Form - Handling form submit
console.log("18.P.Form - Handling form submit");

const createProduct = async (formData: FormData) => {
      // Example API call:
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      return response.json();
    };

    
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  console.log("18.1.P.Form - Inside handleSubmit");
  e.preventDefault();
  const formSubmitData = new FormData();
  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key) && formData[key] !== null) {
      console.log(`18.2.P.Form - Appending ${key} to FormData: `, formData[key]); // Debug line added
      formSubmitData.append(key, formData[key].toString());
    }
  }
  // Debug line to show all entries in FormData
  for (let pair of formSubmitData.entries()) {
    console.log('18.2.1.P.Form - FormData content:', pair[0] + ', ' + pair[1]);
    console.log('18.2.2.P.Form - formSubmitData is:', formSubmitData);
  }
  try {
    console.log("18.3.P.Form - Sending form data");
    // Debug line added to show FormData object
    console.log("18.4.P.Form - Debug: Ready to send data, formSubmitData: ", formSubmitData);

    
    // Call the createProduct function and pass in the formSubmitData
    const response = await createProduct(formSubmitData);

    // Handle success - you might want to reset the form or navigate to another page
    if (response) {
      // Your success handling logic here
    }

    console.log("18.5.P.Form - Form data successfully sent");
  } catch (error) {
    console.log("18.6.P.Form - Error in form submission");
    console.error(error);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={imageRef} onChange={handleFile} />
      {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" width="100" />}
      <input type="number" name="SKU" value={formData.SKU} onChange={handleFormData} />
      <input type="date" name="receivedDate" value={formData.receivedDate instanceof Date ? formData.receivedDate.toISOString().split("T")[0] : ""} onChange={handleFormData} />
      <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleCheckbox} />
      <input type="text" name="customerName" value={formData.customerName} onChange={handleFormData} />
      <input type="text" name="model" value={formData.model} onChange={handleFormData} />
      <input type="text" name="brand" value={formData.brand} onChange={handleFormData} />
      <input type="text" name="location" value={formData.location} onChange={handleFormData} />
      <input type="text" name="category" value={formData.category} onChange={handleFormData} />
      <input type="number" name="year" value={formData.year} onChange={handleFormData} />
      <input type="number" name="exposureCounter" value={formData.exposureCounter} onChange={handleFormData} />
      <input type="number" name="wholesalePrice" value={formData.wholesalePrice} onChange={handleFormData} />
      <input type="number" name="retailPrice" value={formData.retailPrice} onChange={handleFormData} />
      <input type="number" name="profit" value={formData.profit} onChange={handleFormData} />
      <textarea name="description" value={formData.description} onChange={handleTextArea}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

// 15.P.Form - Exporting the ProductForm component
console.log("15.P.Form - Exporting the ProductForm component");
export default ProductForm;
