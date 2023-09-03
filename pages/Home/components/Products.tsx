import React from "react";

const LatestProducts = () => {
  const products = [
    {
      id: 1,
      image: "your-image-url-1",
      title: "Product 1",
      price: "$49.99",
    },
    {
      id: 2,
      image: "your-image-url-2",
      title: "Product 2",
      price: "$59.99",
    },
    {
      id: 3,
      image: "your-image-url-3",
      title: "Product 3",
      price: "$69.99",
    },
    {
      id: 4,
      image: "your-image-url-4",
      title: "Product 4",
      price: "$79.99",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Latest Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded p-4 transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-lg font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;