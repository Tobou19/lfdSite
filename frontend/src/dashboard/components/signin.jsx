import React, { useState } from "react";
import auth from "../../images/auth.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin({ loginned }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://lfdsite.onrender.com/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message || "Connexion réussie ✅");
      setError(false);
      loginned();
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.error || "Erreur d'identifiants ❌");
      } else {
        setMessage("Le serveur ne répond pas. Veuillez réessayer plus tard.");
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10 flex flex-col gap-8 relative overflow-hidden">
        {/* Animation & Title */}
        <div className="flex flex-col items-center gap-4">
          <img src={auth} alt="Login animation" className="h-24 w-24 animate-bounce" />
          <h1 className="text-3xl font-bold text-gray-800">Connexion Admin</h1>
          <p className="text-gray-500 text-sm text-center">Accédez au tableau de bord de gestion des bénéficiaires</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={`w-full px-4 pt-5 pb-2 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500
                ${error ? "border-red-400 focus:ring-red-400" : "border-gray-300"}`}
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-1 text-green-600 text-xs font-semibold"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
              className={`w-full px-4 pt-5 pb-2 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500
                ${error ? "border-red-400 focus:ring-red-400" : "border-gray-300"}`}
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1 text-green-600 text-xs font-semibold"
            >
              Mot de passe
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Cacher mot de passe" : "Afficher mot de passe"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm">
            <a href="#" className="text-green-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
              </svg>
            )}
            {isLoading ? "Connexion..." : "Connexion"}
          </button>

          {/* Feedback Message */}
          {message && (
            <p className={`text-center text-sm font-medium ${error ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>

        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
}
