const baseURL = 'http://127.0.0.1:4000/api/blogs';

export const getBlogs = async () => {
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

export const createBlog = async (blog) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify({ title: blog.title, content: blog.content, tags: blog.tags }));

    if (blog.image) {
      formData.append('image', blog.image);
    }

    console.log('Creating blog with data: ', { title: blog.title, content: blog.content, tags: blog.tags, image: blog.image });

    const response = await fetch(baseURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Ensure that the error is propagated to the caller
  }
};


export const updateBlog = async (blog) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify({ title: blog.title, content: blog.content, tags: blog.tags }));


    if (blog.image) {
      formData.append('image', blog.image);
    }

    console.log('Updating blog with id and data: ', blog._id, { title: blog.title, content: blog.content, tags: blog.tags });

    const response = await fetch(`${baseURL}/${blog._id}`, {
      method: 'PUT',
      body: formData,
    });

    const updatedBlog = await response.json();
    return updatedBlog;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    await fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};
