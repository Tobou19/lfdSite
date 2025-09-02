import React, { useState } from "react";
import auth from "../../images/auth.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({loginned}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate  =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      setMessage(res.data.message || "Connexion réussie ✅");
      setError(false);
      loginned();
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Erreur d'identifiants ❌");
        setError(true);
      } else {
        setMessage("Le serveur ne répond pas. Veuillez réessayer plus tard.");
        setError(true)
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="shadow-xs p-12 px-16 min-h-80 h-auto border rounded-lg flex flex-col gap-8"
        style={{ width: "450px" }}
      >
        <div className="font-bold flex justify-center items-center gap-2">
          <img src={auth} alt="" className="size-10" />
          <h1 className="text-gray-600 text-3xl">Connexion</h1>
        </div>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
       
          <div className="md:flex mb-6 flex-col">
            <label
              className="block text-gray-500 font-bold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
              text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="md:flex mb-6 flex-col">
            <label
              className="block text-gray-500 font-bold mb-1"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
              text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <span className="text-sm">Mot de passe oublié ? </span>
            <a
              href="#"
              className="text-sm text-violet-500 underline font-normal"
            >
              Appelez le service technique
            </a>
          </div>

          <div className="flex justify-center">
            <button
              className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none 
              text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Connexion"}
            </button>
          </div>
        </form>

        {error == true ? (message && (
          <div className="text-center mt-4 text-sm text-red-500">{message}</div>
        )) : (message && (
          <div className="text-center mt-4 text-sm text-green-500">{message}</div>
        ))}
      </div>
    </div>
  );
}
