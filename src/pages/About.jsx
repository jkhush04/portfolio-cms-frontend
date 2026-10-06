import { useEffect, useState } from "react";
import api from "../lib/api";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/api/about")
      .then((res) => setAbout(res.data))
      .catch((err) => {
        // 404 just means you haven't filled in About yet via the admin panel
        if (err.response?.status === 404) {
          setAbout(null);
        } else {
          setError("Failed to load About.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!about) return <p>No About info yet.</p>;

 return (
   <div className="max-w-2xl">
     <h1 className="section-title">{about.name}</h1>
     <p className="text-lg text-gray-500">{about.headline}</p>
     <p className="mt-6 text-gray-700 leading-relaxed">{about.bio}</p>
   </div>
 );
}