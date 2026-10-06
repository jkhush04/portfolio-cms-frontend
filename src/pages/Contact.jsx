import { useState } from "react";
import api from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" }); // clear the form
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>


      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text" name="name" placeholder="Your name"
          value={form.name} onChange={handleChange} required
          className="border rounded-lg p-3 focus:outline-none focus:border-[var(--color-accent)]"
        />
        <input
          type="email" name="email" placeholder="Your email"
          value={form.email} onChange={handleChange} required
          className="border rounded-lg p-3 focus:outline-none focus:border-[var(--color-accent)]"
        />
        <textarea
          name="message" placeholder="Your message"
          value={form.message} onChange={handleChange} required rows={5}
          className="border rounded-lg p-3 focus:outline-none focus:border-[var(--color-accent)]"
        />
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>


      {status === "success" && (
        <p className="text-green-600 mt-3">Message sent! I'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-3">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}