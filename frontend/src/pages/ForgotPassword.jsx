import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword(){

  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");

  const sendReset = async () => {

    try{
      const res = await API.post("forgot-password/",{ email });
      setMessage(res.data.message);

    }catch{
      setMessage("Email not found");
    }

  };

  return(

    <div className="login-page">

      <div className="login-card">

        <h2>Reset Password</h2>

        <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={sendReset} className="login-btn">
          Send Reset Link
        </button>

        <p>{message}</p>

      </div>

    </div>

  );

}
