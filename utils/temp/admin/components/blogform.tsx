import React, { useState, createRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


Quill.register("modules/imageResize", ImageResize);

const modules = {
	toolbar: {
		container: [
			[
				{ header: "1" },
				{ header: "2" },
				{ header: "3" },
				{ header: "4" },
				{ header: "5" },
				{ header: "6" },
				{ font: [] },
			],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image", "video"],
			["clean"],
		],
	},
	imageResize: {
		imageResize: true,
	},
};

export interface Blog {
	_id?: string;
	title: string;
	content: string;
	tags: string[];
	imageUrl?: string;
	image?: File | null; // Add this line
}


interface Props {
	mode: "create" | "update";
	blog?: Blog;
	onSave: (blog: Blog) => void;
	onCancel: () => void;
}

const BlogForm = ({
	mode,
	blog = { title: "", content: "", tags: [] },
	onSave,
	onCancel,
}: Props) => {
	console.log("BlogForm tags:", blog?.tags);
	const [title, setTitle] = useState(blog.title);
	const [content, setContent] = useState(blog.content);
	const [tags, setTags] = useState(blog.tags ? blog.tags.join(", ") : "");
	const quillRef = createRef<ReactQuill>();
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
	  const fetchData = async () => {
		try {
		  if (mode === "update" && blog) {
			console.log("Blog tags:", blog.tags);
			setTitle(blog.title);
			setContent(blog.content);
			setTags(blog.tags ? blog.tags.join(", ") : "");
			console.log("Tags state:", tags);
	
			if (blog.imageUrl) {
			  const response = await fetch(`http://localhost:4000/${blog.imageUrl}`);
			  if (!response.ok) {
				throw new Error(response.statusText);
			  }
			  const blob = await response.blob();
			  const file = new File([blob], blog.imageUrl);
			  setImage(file);
			}
			
		  }
		} catch (error) {
		  console.error(error);
		  // Handle the error, e.g., show an error message to the user
		}
	  };
	
	  fetchData();
	}, [mode, blog, setTitle, setContent, setTags, setImage]);
	

const handleFileUpload = async (file: File) => {
  try {
	const formData = new FormData();
	formData.append("image", file);
	// Use the formData object as needed
  } catch (error) {
	console.log('Error appending file to FormData:', error);
  }
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  const tagsArray = tags.split(",").map((tag) => tag.trim());
  formData.append("tags", JSON.stringify(tagsArray));

  // Get the file input element and selected file
  let inputElement = document.querySelector("input[type='file']") as HTMLInputElement;
  if (inputElement) {
	let file = inputElement.files && inputElement.files.length > 0 ? inputElement.files[0] : null;
	if (file) {
	  await handleFileUpload(file);
	} else {
	  console.log('No file selected');
	}
  } else {
	console.log('No file input found');
  }

  const requestOptions: RequestInit = {
	method: mode === "create" ? "POST" : "PUT",
	body: formData,
  };

  const response = await fetch(
	`http://localhost:4000/api/blogs${
	  mode === "update" && blog ? `/${blog._id}` : ""
	}`,
	requestOptions
  );

  if (response.ok) {
	const updatedBlog = await response.json();
	onSave(updatedBlog);
  } else {
	// handle the error
  }
};

	return (
		<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<ToastContainer />
			<form onSubmit={handleSubmit}style={{ height: '80vh', overflow: 'scroll' }}>
				<h2 className="text-xl font-bold mb-6">
					{mode === "create" ? "Create" : "Update"} Blog
				</h2>
				
				<div className="mb-4">
					
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="title"
					>
						Title:
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="tags"
					>
						Tags:
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="tags"
						type="text"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						placeholder="Separate tags with commas"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="image"
					>
						Image:
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="image"
						type="file"
						accept="image/*"
						onChange={(e) =>
							setImage(e.target.files ? e.target.files[0] : null)
						}
					/>
				</div>

				{/* Image thumbnail */}
				{image && (
					<div className="mb-4">
						<img
							src={URL.createObjectURL(image)}
							alt="Imported thumbnail"
							className="w-auto h-40 object-cover mb-4"
						/>
					</div>
				)}

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="content"
					>
						Content:
					</label>
					<ReactQuill
						// Add this line
						value={content}
						onChange={setContent}
						theme="snow"
						modules={modules}
						ref={quillRef}
					/>

				</div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					{mode === "create" ? "Create" : "Update"} Blog
				</button>
				<button
					className="hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
					type="button"
					onClick={onCancel}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default BlogForm;