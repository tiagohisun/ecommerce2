import React, { useState, useEffect } from "react";
import DynamicBlogForm from "../components/DynamicBlogForm";
import Modal from "react-modal";
import {
	getBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
} from "../../../pages/api/blogsApi";

export interface Blog {
	_id?: string;
	title: string;
	content: string;
	tags: string[];
	imageUrl?: string;
	image?: File | null
}

const Blog = () => {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [editingBlog, setEditingBlog] = useState<Blog | undefined>(undefined);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [creating, setCreating] = useState(false);

function getImageUrl(blog) {
	if (!blog.imageUrl) return "";
	return `http://localhost:4000/${blog.imageUrl}`;
}

	const fetchBlogs = async () => {
		const fetchedBlogs = await getBlogs();
		setBlogs(fetchedBlogs);
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	const handleSave = async (blog: Blog) => {
	  if (creating) {
		await createBlog(blog);
		setCreating(false);
	  } else {
		await updateBlog(blog);
	  }
	  setIsModalOpen(false);
	  fetchBlogs();
	};
	
const handleEdit = (blog: Blog) => {
	// Convert imageUrl to File object before passing it to the form
	if (blog.imageUrl) {
		fetch(getImageUrl(blog))
			.then((response) => response.blob())
			.then((blob) => {
				const fileName = blog.imageUrl
					? blog.imageUrl.split("/").pop() || ""
					: ""; // Check if blog.imageUrl exists before extracting file name
				const file = new File([blob], fileName, { type: blob.type });
				setEditingBlog({ ...blog, image: file });
			});
	} else {
		setEditingBlog(blog); // <-- Add this line to set the editingBlog state when there is no imageUrl
	}
	setCreating(false);
	setIsModalOpen(true);
};


const handleDelete = async (blogId: string) => {
		await deleteBlog(blogId);
		fetchBlogs();
	};

	return (
	<div className="relative max-h-screen">
		<h1 className="text-2xl font-bold mb-1">Blog</h1>
		<button
			className="bg-green-500 hover:bg-green-700 text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-1"
			onClick={() => {
				setEditingBlog(undefined);
				setCreating(true);
				setIsModalOpen(true);
			}}
		>
			Create Blog
		</button>
		<div className="max-h-screen overflow-auto">
			{blogs.map((blog) => (
				<div
					key={blog._id}
					className="bg-white shadow-md rounded px-2 pt-1 pb-1 mb-1 flex flex-row items-center" // Use flex and items-center to align content horizontally and vertically.
				>
					{getImageUrl(blog) && (
						<img
		  src={getImageUrl(blog)}
		  alt={blog.title}
		  className="object-cover mr-2"
		  width="50"
		  height="50"
		/>
					)}
					<h2 className="text-xl font-bold mr-4">{blog.title}</h2>
				<div
  className="overflow-x-auto text-sm truncate pr-2"
  style={{ maxWidth: "50px" }}
  dangerouslySetInnerHTML={{
    __html: (blog.content?.length || 0) > 50
      ? blog.content?.slice(0, 50) + "..."
      : blog.content?.replace(/<img[^>]+>/g, "") || "",
  }}
></div>


					<div className="flex">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
							onClick={() => handleEdit(blog)}
						>
							Edit
						</button>
						<button
							className="bg-red-500 hover:bg-red-700 text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
							onClick={() => handleDelete(blog._id!)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
		{isModalOpen && (
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				contentLabel={creating ? "Create Blog" : "Edit Blog"}
				ariaHideApp={false}
				className="ml-64" // Add a left margin similar to the blog list
			>
				<DynamicBlogForm
					mode={creating ? "create" : "update"}
					blog={editingBlog}
					image={editingBlog?.image} // Pass the image prop from the editingBlog state
					onSave={(blog) => {
						handleSave(blog);
					}}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		)}
	</div>
);

};

export default Blog;
