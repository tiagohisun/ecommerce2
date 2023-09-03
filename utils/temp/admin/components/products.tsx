import React, { useState, useEffect } from "react";
import ProductForm from "./productform";
import { updateProduct, deleteProduct } from "../../api/productsAPI";

type Product = {
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
  profit: number;
  description: string;
  imageUrl: string;
  image?: File;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:4000/api/products");
    const products = await response.json();
    // Convert receivedDate to a Date object
    const updatedProducts = products.map((product: Product) => ({
      ...product,
      receivedDate: new Date(product.receivedDate)
    }));
    setProducts(updatedProducts);
  };
 const handleProductEdit = (product: Product) => {
    setSelectedProduct(product);
  };

const handleProductUpdate = async (updatedProduct: Product) => {
  const imageUrl = updatedProduct.imageUrl;
  const folderPath = imageUrl.substring(0, imageUrl.lastIndexOf('/'));
   console.log("Folder Path in handleProductUpdate:", folderPath);
   const newProduct = {
    ...updatedProduct,
    receivedDate: new Date(updatedProduct.receivedDate), // Ensure receivedDate is a Date object
    imageUrl: updatedProduct.imageUrl,
  };
     const updatedProducts = products.map((product) =>
    product._id === updatedProduct._id ? newProduct : product
  );
   setProducts(updatedProducts);
  setSelectedProduct(null);
   try {
    const response = await fetch(`/api/products/${updatedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ folderPath, data: newProduct })
    });
     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
     const responseData = await response.json();
    console.log("Product update response:", responseData);
  } catch (error) {
    console.error("Error while updating product:", error);
  }
};

const handleProductDelete = async (productId: string) => {
  await deleteProduct(productId);
  fetchProducts(); // Fetch the updated list of products
  if (selectedProduct?._id === productId) {
    setSelectedProduct(null); // Reset the selectedProduct if it was deleted
  }
};
const handleProductSubmit = async (product: Product) => {
  console.log("Submit button clicked");
  const folderData1 = product.imageUrl.substring(0, product.imageUrl.lastIndexOf('/'));
  console.log(`Product Folder Data: ${folderData1}`);
   // Convert receivedDate to a Date object
  const newProduct = {
    ...product,
    receivedDate: new Date(product.receivedDate),
  };
  
   setProducts([...products, newProduct]);
   try {
    const response = await fetch(`/api/products/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: newProduct, folderPath: folderData1 })
    });
     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
     const responseData = await response.json();
    console.log("Product update response:", responseData);
  } catch (error) {
    console.error("Error while updating product:", error);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-700 mb-2">Products</h2>
      <div className="flex overflow-x-auto justify-center items-center">
        <ProductForm
          key={selectedProduct?._id || "newProduct"}
          product={
            selectedProduct || {
              _id: "",
              SKU: 123,
              receivedDate: new Date(),
              isAvailable: false,
              customerName: "Dra. Clara",
              model: "Cranex D Ceph", // New field
              brand: "SOREDEX", // New field
              location: "São Paulo",
              category: "Panorâmico", // New field
              year: new Date().getFullYear(), // New field
              exposureCounter: 11000, // New field
              wholesalePrice: 55000,
              retailPrice: 50000,
              profit: 7,
              description: "Aparelho muito bom",
              imageUrl: "",
            }
          }
          onSubmit={selectedProduct ? handleProductUpdate : handleProductSubmit}
        />
      </div>
       <table className="whitespace-nowrap mx-2 text-6xl" style={{ fontSize: '0.670rem' }}>
        <thead>
  <tr>
    <th className="text-center">Image</th> {/* New header for images */}
    <th className="text-center">SKU</th>
    <th className="text-center">Available</th>
    <th className="text-center">Rec.Date</th>
    <th className="text-center">Customer</th>
    <th className="text-center">Model</th>
    <th className="text-center">Brand</th>
    <th className="text-center">Location</th>
    <th className="text-center">Category</th>
    <th className="text-center">Year</th>
    <th className="text-center">Exp.Counter</th>
    <th className="text-center">WholeSale Price</th>
    <th className="text-center">Retail Price</th>
    <th className="text-center">Profit</th>
    <th className="text-center">Description</th>
  </tr>
</thead>
<tbody>
  {products.map((product) => (
    
    <tr key={product._id}>
      <td>
        <img src={`http://127.0.0.1:4000/${product.imageUrl}`} alt="product" className="w-10 h-10"/> {/* Image column */}
      </td>
      <td className="text-center">{product.SKU}</td>
      <td className="text-center">{typeof product.isAvailable !== 'undefined' ? (product.isAvailable ? 'Yes' : 'No') : 'N/A'}</td>
      <td className="text-center">{product.receivedDate instanceof Date ? product.receivedDate.toLocaleDateString() : 'N/A'}</td>
      <td className="text-center">{product.customerName}</td>
      <td className="text-center">{product.model}</td>
      <td className="text-center">{product.profit}</td>      
      <td className="text-center">{product.brand}</td>
      <td className="text-center">{product.location}</td>
      <td className="text-center">{product.category}</td>
      <td className="text-center">{product.year}</td>
      <td className="text-center">{product.exposureCounter}</td>
      <td className="text-center">{formatPrice(product.wholesalePrice)}</td>
      <td className="text-center">{formatPrice(product.retailPrice)}</td>
      <td className="text-center">{formatPrice(product.profit)}</td>

      <td className="text-center">{product.description}</td>
      <td className="text-center">
        <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          onClick={() => handleProductEdit(product)}
        >
          Update
        </button>
        <button
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => handleProductDelete(product._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default Products;
