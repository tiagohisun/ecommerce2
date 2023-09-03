const {google} = require('googleapis');

async function createGoogleContact(auth, customer) {
  const service = google.people({version: 'v1', auth});
  const contact = {
    names: [{
      givenName: customer.name
    }],
    emailAddresses: [{
      value: customer.email
    }],
    phoneNumbers: [{
      value: customer.phoneNumber
    }],
    addresses: [{
      streetAddress: customer.address
    }],
  };
  try {
    const response = await service.people.createContact({
      requestBody: contact,
      personFields: 'names,emailAddresses,phoneNumbers,addresses',
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Google contact:', error);
    throw error;
  }
}
