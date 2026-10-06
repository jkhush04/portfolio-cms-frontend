import {useEffect , useState} from "react";

import api from "../lib/api";

export default function Experience(){
    const [experiences, setExperiences] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);



  useEffect(() => {
    api.get("/api/experience")
      .then((res) => setExperiences(res.data))
      .catch(() => setError("Failed to load Experience."))
      .finally(() => setLoading(false));
  }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p className="text-red-500">{error}</p>;
   if (experiences.length === 0) return <p>No experiences added yet.</p>;



 return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Experience</h1>
    <ul className="flex flex-col gap-6">
      {experience.map((exp) => (
        <li key={exp.id} className="border-l-2 border-[var(--color-accent)] pl-5">
          <h2 className="font-semibold">{exp.role} <span className="text-gray-400">@</span> {exp.company}</h2>
          <p className="text-sm text-gray-500">{exp.startDate} – {exp.endDate || "Present"}</p>
          <p className="mt-2 text-gray-700">{exp.description}</p>
        </li>
      ))}
    </ul>
    </div>
  );

 }

