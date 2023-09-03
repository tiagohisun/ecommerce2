// Custom debug function
const debug = (id: string, message: string, data?: any) => {
  if (process.env.DEBUG === 'true') {
    console.log(`${id} - ${message}`, data);
  }
};

// Custom error class
class APIError extends Error {
  constructor(message: string, public data: any = null) {
    super(message);
  }
}

const baseURL = 'http://127.0.0.1:4000/api/products';

export const fetchProducts = async () => {
  try {
    debug("1. P.API", "Starting fetchProducts");
    const response = await fetch(baseURL);
    debug("2. P.API", "Fetched data", response);

    if (!response.ok) {
      throw new APIError('Network response was not ok', response);
    }

    const jsonResponse = await response.json();
    debug("3. P.API", "Parsed JSON", jsonResponse);

    return jsonResponse;
  } catch (error) {
    debug("4. P.API", "Error in fetchProducts", error);
    throw error;
  }
};

// 6. P.API - Create a new product
export const createProduct = async (productData: FormData) => {
  console.log("6. P.API - === Starting createProduct ===");
  // 7. P.API - Validate product data before sending
  if (!productData) {
    console.log("7. P.API - Error: Missing required product data");
    throw new Error('Missing required product data');
  }

  try {
    // 8. P.API - Making POST request to create a new product
    const response = await fetch(baseURL, {
      method: 'POST',
      body: productData,
    });
    console.log("8. P.API - Response from POST request:", response);

    // 9. P.API - Checking if the server response is ok
    if (!response.ok) {
      console.log("9. P.API - Server response not ok.");
      throw new Error('Network response was not ok');
    }

    // 10. P.API - Parsing the JSON response
    const jsonResponse = await response.json();
    console.log("10. P.API - Parsed JSON Response:", jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.log("11. P.API - Error creating product:", error);
    throw error;
  }
};

// 12. P.API - Update an existing product
export const updateProduct = async (id, product, image) => {
  console.log("12. P.API - === Starting updateProduct ===");
  try {
    // 13. P.API - Creating FormData object to store product and image data
    const formData = new FormData();
    formData.append('data', JSON.stringify(product));
    if (image) {
      formData.append('image', image);
    }
    console.log("13. P.API - FormData Created:", formData);

    // 14. P.API - Making PUT request to update the product
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      body: formData,
    });
    console.log("14. P.API - Response from PUT request:", response);

    // 15. P.API - Checking if the server response is ok
    if (!response.ok) {
      console.log("15. P.API - Server response not ok.");
      throw new Error('Network response was not ok');
    }

    // 16. P.API - Parsing the JSON response
    const jsonResponse = await response.json();
    console.log("16. P.API - Parsed JSON Response:", jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.log("17. P.API - Error updating product:", error);
    throw error;
  }
};

// 18. P.API - Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  console.log("18. P.API - === Starting deleteProduct ===");
  try {
    // 19. P.API - Define URL to send delete request
    const url = `http://127.0.0.1:4000/api/products/${id}`;
    console.log("19. P.API - Attempting to delete product at URL:", url);

    // 20. P.API - Making DELETE request to remove the product
    const response = await fetch(url, {
      method: 'DELETE',
    });
    console.log("20. P.API - Response status:", response.status);

    // 21. P.API - Checking if the server response is ok
    if (response.ok) {
      console.log("21. P.API - Product successfully deleted.");
      return;
    } else if (response.status === 404) {
      console.log("22. P.API - Product not found");
      return;
    } else {
      console.log("23. P.API - Server response not ok.");
      throw new Error(`Delete request failed with status ${response.status}`);
    }
  } catch (error) {
    console.log("24. P.API - Error deleting product:", error);
    throw error;
  }
};
