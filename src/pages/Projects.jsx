import {useEffect , useState} from "react";

import api from "../lib/api";

export default function Projects(){
    const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);



  useEffect(() => {
    api.get("/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Failed to load Projects."))
      .finally(() => setLoading(false));
  }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p className="text-red-500">{error}</p>;
   if (projects.length === 0) return <p>No projects added yet.</p>;



return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
     <ul className="grid grid-cols-2 gap-5">
       {projects.map((project) => (
         <li key={project.id} className="card">
           <h2 className="font-semibold text-lg">{project.title}</h2>
           <p className="text-gray-600 text-sm mt-1">{project.description}</p>

           <div className="flex flex-wrap gap-2 mt-3">
             {project.techStack?.map((tech) => (
               <span key={tech} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                 {tech}
               </span>
             ))}
           </div>

           <div className="flex gap-4 mt-3 text-sm">
             {project.githubUrl && (
               <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:underline">
                 GitHub
               </a>
             )}
             {project.liveUrl && (
               <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:underline">
                 Live
               </a>
             )}
           </div>
         </li>
       ))}
     </ul>
    </div>
  );

 }

