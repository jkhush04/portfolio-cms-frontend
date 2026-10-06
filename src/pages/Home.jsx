import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function Home() {
  const [about, setAbout] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/about").catch(() => ({ data: null })),
      api.get("/api/projects").catch(() => ({ data: [] })),
      api.get("/api/services").catch(() => ({ data: [] })),
      api.get("/api/testimonials").catch(() => ({ data: [] })),
    ]).then(([aboutRes, projectsRes, serviceRes, testimonialsRes]) => {
      setAbout(aboutRes.data);
      setFeaturedProjects((projectsRes.data || []).filter((p) => p.featured));
      setServices(serviceRes.data || []);
      setTestimonials(testimonialsRes.data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

   return (
     <div>
       <section className="py-16 text-center">
         <h1 className="text-5xl font-extrabold tracking-tight">
           {about ? about.name : "Welcome to my portfolio"}
         </h1>
         {about?.headline && (
           <p className="text-xl text-gray-500 mt-3">{about.headline}</p>
         )}
         <div className="flex gap-3 mt-6 justify-center">
           <Link to="/projects" className="btn-primary">View Projects</Link>
           <Link to="/contact" className="btn-secondary">Contact Me</Link>
         </div>
       </section>

       {featuredProjects.length > 0 && (
         <section className="mt-12">
           <h2 className="section-title">Featured Projects</h2>
           <ul className="grid grid-cols-2 gap-4">
             {featuredProjects.map((project) => (
               <li key={project.id} className="card">
                 <h3 className="font-semibold">{project.title}</h3>
                 <p className="text-gray-600 text-sm mt-1">{project.description}</p>
               </li>
             ))}
           </ul>
         </section>
       )}

       {services.length > 0 && (
         <section className="mt-12">
           <h2 className="section-title">Services</h2>
           <ul className="grid grid-cols-3 gap-4">
             {services.map((s) => (
               <li key={s.id} className="card">
                 <h3 className="font-semibold">{s.title}</h3>
                 <p className="text-gray-600 text-sm mt-1">{s.description}</p>
               </li>
             ))}
           </ul>
         </section>
       )}

       {testimonials.length > 0 && (
         <section className="mt-12">
           <h2 className="section-title">What People Say</h2>
           <ul className="grid grid-cols-2 gap-4">
             {testimonials.map((t) => (
               <li key={t.id} className="card">
                 <p className="italic text-gray-700">"{t.message}"</p>
                 <p className="mt-3 font-semibold text-sm">{t.authorName}</p>
                 <p className="text-xs text-gray-500">{t.authorRole}</p>
               </li>
             ))}
           </ul>
         </section>
       )}
     </div>
   );


}