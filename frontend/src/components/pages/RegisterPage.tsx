import React, { useState, ChangeEvent, FormEvent } from "react";
import '../../styles/formulario.css'; 

export const RegisterPage: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setUser({ name: "", email: "", phone: "", password: "" });
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    // Aplicando a classe principal para o estilo
    <div className="form-container"> 
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        {/* Usando "form-group" para agrupar e dar espaçamento */}
        <div className="form-group"> 
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};
