const baseURL = 'http://127.0.0.1:4000/api/customers';

export const fetchCustomers = async () => {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export async function createCustomer(customerData: any) {
  try {
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    // Log status and response for debugging
    console.log("Response status:", response.status);
    console.log("Response:", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error text:", errorText);
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createCustomer:", error);
    throw error;
  }
}



export const updateCustomer = async (id, customer) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
    });

    // Added same check as other methods
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
}