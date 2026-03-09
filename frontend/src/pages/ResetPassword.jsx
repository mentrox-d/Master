import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function ResetPassword(){

  const { uid, token } = useParams();
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const reset = async () => {

    try{

      const res = await API.post(`reset-password/${uid}/${token}/`,{
        password
      });

      setMessage(res.data.message);

    }catch{
      setMessage("Invalid or expired link");
    }

  };

  return(

    <div className="login-page">

      <div className="login-card">

        <h2>Set New Password</h2>

        <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={reset} className="login-btn">
          Reset Password
        </button>

        <p>{message}</p>

      </div>

    </div>

  );

}