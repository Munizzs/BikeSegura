import React, { useState, ChangeEvent, FormEvent } from "react";
import '../../styles/formulario.css'; 

export const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        alert("Login realizado com sucesso!");
       
        setCredentials({ email: "", password: "" });
      } else {
        alert("Email ou senha inválidos.");
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="form-container"> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};