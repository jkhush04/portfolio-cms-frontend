import {useEffect , useState} from "react";

import api from "../lib/api";

export default function Skills(){
    const [skills, setSkills] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);



  useEffect(() => {
    api.get("/api/skills")
      .then((res) => setSkills(res.data))
      .catch(() => setError("Failed to load Skills."))
      .finally(() => setLoading(false));
  }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p className="text-red-500">{error}</p>;
   if (skills.length === 0) return <p>No skills added yet.</p>;



 return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Skills</h1>
      <ul className="grid grid-cols-2 gap-4">
      {skills.map((skill) => (
        <li key={skill.id} className="card">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{skill.name}</p>
            <span className="text-xs text-gray-500">{skill.category}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-[var(--color-accent)]"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600 w-9 text-right">
              {skill.level}%
            </span>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );


 }

