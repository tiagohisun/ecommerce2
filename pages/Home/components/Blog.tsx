import React from "react";

interface BlogCardProps {
	title: string;
	date: string;
	imageUrl: string;
	summary: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
	title,
	date,
	imageUrl,
	summary,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<img
				src={imageUrl}
				alt="Blog post image"
				className="w-full h-48 md:h-56 object-cover"
			/>
			<div className="p-6">
				<p className="text-sm text-darkBlue mb-1">{date}</p>
				<h3 className="text-xl font-bold mb-2 text-2D3E50">{title}</h3>
				<p className="text-base text-gray-600">{summary}</p>
				<a
					href="#"
					className="text-skyBlue hover:text-darkBlue mt-4 inline-block"
				>
					Read more →
				</a>
			</div>
		</div>
	);
};

const Blog = () => {
  const blogPosts = [
    {
      title: "Blog Post Title 1",
      date: "March 25, 2023",
      imageUrl: "https://via.placeholder.com/640x360",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Blog Post Title 2",
      date: "March 20, 2023",
      imageUrl: "https://via.placeholder.com/640x360",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Blog Post Title 3",
      date: "March 15, 2023",
      imageUrl: "https://via.placeholder.com/640x360",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="bg-lightBlue py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="text-white bg-darkBlue px-6 py-2 rounded-lg">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
