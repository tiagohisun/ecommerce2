import dynamic from "next/dynamic";
import { Blog } from "./blog";

// Add the image prop to the DynamicBlogForm type
interface DynamicBlogFormProps {
	mode: "create" | "update";
	blog?: Blog;
	image?: File | null;
	onSave: (blog: Blog) => void;
	onCancel: () => void;
}

// Modify the dynamic import to accept the DynamicBlogFormProps type
const DynamicBlogForm = dynamic<DynamicBlogFormProps>(
	() => import("./BlogForm"),
	{ ssr: false }
);

export default DynamicBlogForm;
