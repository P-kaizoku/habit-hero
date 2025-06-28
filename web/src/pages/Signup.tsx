import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-20 flex flex-col gap-4"
      >
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="p-2 border"
        />
        <button className="bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </>
  );
}
