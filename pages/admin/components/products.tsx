// 1. P. - Importing necessary modules and components
import React, { useState, useEffect } from "react";
import ProductForm from "./productform"; // 2. P. - Importing ProductForm component
import { deleteProduct } from "../../api/productsAPI"; // 3. P. - Importing API functions

// 4. P. - Defining the Product type
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
  const [products, setProducts] = useState<Product[]>([]); // 5. P. - Initializing products state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // 6. P. - Initializing selectedProduct state

  useEffect(() => {
    fetchProducts(); // 7. P. - Fetching products when component mounts
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:4000/api/products"); // 8. P. - Fetching products from API
    const products = await response.json(); // 9. P. - Converting response to JSON

    // 10. P. - Converting receivedDate to a Date object and updating products state
    const updatedProducts = products.map((product: Product) => ({
      ...product,
      receivedDate: new Date(product.receivedDate)
    }));

    setProducts(updatedProducts); // 11. P. - Updating products state
  };

  const handleProductEdit = (product: Product) => {
    setSelectedProduct(product); // 12. P. - Setting selectedProduct state when editing a product
  };

  const handleProductUpdate = async (updatedProduct: Product) => {
    const imageUrl = updatedProduct.imageUrl; // 13. P. - Extracting imageUrl from updatedProduct
    const folderPath = imageUrl.substring(0, imageUrl.lastIndexOf('/')); // 14. P. - Extracting folderPath from imageUrl
    console.log("15. P. - Folder Path in handleProductUpdate:", folderPath); // 15. P. - Custom debug: Logging folderPath

    const newProduct = {
      ...updatedProduct,
      receivedDate: new Date(updatedProduct.receivedDate), // 16. P. - Ensuring receivedDate is a Date object
      imageUrl: updatedProduct.imageUrl,
    };

    const updatedProducts = products.map((product) =>
      product._id === updatedProduct._id ? newProduct : product
    );

    setProducts(updatedProducts); // 17. P. - Updating products state
    setSelectedProduct(null); // 18. P. - Resetting selectedProduct state

    try {
      const response = await fetch(`/api/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folderPath, data: newProduct }) // 19. P. - Sending updated product data to API
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const responseData = await response.json(); // 20. P. - Converting response to JSON
      console.log("21. P. - Product update response:", responseData); // 21. P. - Custom debug: Logging response data
    } catch (error) {
      console.error("22. P. - Error while updating product:", error); // 22. P. - Custom debug: Logging error
    }
  };

  const handleProductDelete = async (productId: string) => {
    await deleteProduct(productId); // 23. P. - Deleting product using API function
    fetchProducts(); // 24. P. - Fetching updated list of products

    if (selectedProduct?._id === productId) {
      setSelectedProduct(null); // 25. P. - Resetting selectedProduct state if it was deleted
    }
  };

  const handleProductSubmit = async (product: Product) => {
    console.log("26. P. - Submit button clicked"); // 26. P. - Custom debug: Logging submit button click
    const folderData1 = product.imageUrl.substring(0, product.imageUrl.lastIndexOf('/')); // 27. P. - Extracting folderPath from imageUrl
    console.log(`28. P. - Product Folder Data: ${folderData1}`); // 28. P. - Custom debug: Logging folderData1

    const newProduct = {
      ...product,
      receivedDate: new Date(product.receivedDate), // 29. P. - Ensuring receivedDate is a Date object
    };

    setProducts([...products, newProduct]); // 30. P. - Updating products state

    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newProduct, folderPath: folderData1 }) // 31. P. - Sending new product data to API
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const responseData = await response.json(); // 32. P. - Converting response to JSON
      console.log("33. P. - Product update response:", responseData); // 33. P. - Custom debug: Logging response data
    } catch (error) {
      console.error("34. P. - Error while updating product:", error); // 34. P. - Custom debug: Logging error
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price); // 35. P. - Formatting price
  };

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
