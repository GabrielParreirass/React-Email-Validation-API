import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css'

function App() {
  const api = import.meta.env.VITE_API_KEY;

  const [email, setEmail] = useState("");
  const [exists, setExists] = useState(false)
  const [valid, setValid] = useState(false)


  const verificarEmail = () => {
    axios
      .get(
        `https://api.emailvalidation.io/v1/info?email=${email}&apikey=${api}`
      )
      .then((res) => {
        setExists(res.data.smtp_check)
        setValid(res.data.format_valid)
      });
  };

  return (
    <div className="container">
      <div className="title">Verificador de email</div>
      <input
        type="email"
        placeholder="Digite o email aqui"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => verificarEmail()}>Verificar email</button>
      <p>
        Essa aplicação consome uma Api que irá verificar o email inserido e
        dizer se ele é valido ou não, e se ja existe ou não.
      </p>



      <div className="resp">
        <h2>Existe: </h2>
        {
          exists ? ( <div className="true">Sim</div> ) : ( <div className="false">Não </div> )
        }
      </div>


      <div className="resp">
        <h2>Valido: </h2>
        {
          valid ? ( <div className="true">Sim</div> ) : ( <div className="false">Não </div> )
        }
      </div>

      <span>Api: <a href="https://emailvalidation.io/" rel="next" target='_blank'>Emailvalidation.io</a></span>
    </div>
  );
}

export default App;
