import {useEffect , useState} from "react";

import api from "../lib/api";

export default function Blog(){
    const [blogs, setBlogs] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);



  useEffect(() => {
    api.get("/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch(() => setError("Failed to load blogs."))
      .finally(() => setLoading(false));
  }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p className="text-red-500">{error}</p>;
   if (blogs.length === 0) return <p>No blogs added yet.</p>;


return (
  <div>
    <h1 className="section-title">Blog</h1>
    <ul className="flex flex-col gap-6">
      {blogs.map((blog) => (
        <li key={blog.id} className="card">
          <h2 className="font-semibold text-xl">{blog.title}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-3 text-gray-700">{blog.content?.slice(0, 200)}...</p>
          <div className="flex gap-2 mt-3">
            {blog.tags?.map((tag) => (
              <span key={tag} className="text-xs bg-purple-50 text-[var(--color-accent)] px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}