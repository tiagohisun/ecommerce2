
const baseURL = 'http://127.0.0.1:4000/api/products';

export const fetchProducts = async () => {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData: FormData) => {
  if (!productData) {
    console.error('Error: Missing required product data');
    throw new Error('Missing required product data');
  }

  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      body: productData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};



export const updateProduct = async (id, product, image) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(product));
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const url = `http://127.0.0.1:4000/api/products/${id}`;
    console.log("Attempting to delete product at URL:", url);

    const response = await fetch(url, {
      method: 'DELETE',
    });

    console.log("Response status:", response.status);

    if (response.ok) {
      return;
    } else if (response.status === 404) {
      console.error("Product not found");
      return;
    } else {
      throw new Error(`Delete request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};



