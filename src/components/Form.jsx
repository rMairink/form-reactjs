// deps
import EmailJs from "@emailjs/browser";
import { useState } from "react";
// styles
import "./Form.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageValidation, setMessageValidation] = useState("");

  const formValidation = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || message === "") {
      setMessageValidation("Preencha os Campos");
      return;
    } else {
      setMessageValidation("Formulário Enviado");
    }

    const templateParams = {
      from_name: name,
      email: email,
      message: message,
    };

    EmailJs.send(
      "service_m09oe2f",
      "template_96yyx6a",
      templateParams,
      "hInQF_RRB7ZJuPNHF"
    ).then(
      (response) => {
        console.log("Formulário Enviado: ", response.status, response.text);
      },
      (err) => console.log("Falha no Envio do Formulário: ", err)
    );
  };

  return (
    <form onSubmit={formValidation} className="form">
      <h1>Envie-nos um E-mail</h1>

      {messageValidation === "Preencha os Campos" && (
        <p className="error">{messageValidation}</p>
      )}
      {messageValidation === "Formulário Enviado" && (
        <p className="success">{messageValidation}</p>
      )}

      <div className="inputField">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="inputName"
          placeholder="Digite seu Nome"
        />
      </div>

      <div className="inputField">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="inputEmail"
          placeholder="Digite seu Email"
        />
      </div>

      <div className="inputFieldTextArea">
        <textarea
          rows="4"
          onChange={(e) => setMessage(e.target.value)}
          className="message"
          placeholder="Digite sua Mensagem"
        ></textarea>
      </div>

      <input type="submit" value="Enviar" />
    </form>
  );
};

export default Form;
