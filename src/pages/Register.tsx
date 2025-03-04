import { useState } from "react";
import supabase from "../client";

function Register() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");

        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });
       
        if (error){
            setMessage(error.message);
            return;
            
        }
        if (data){
            setMessage("User account created!");
        }
        setEmail("");
        setPassword("");
    }
    return (
        <div>
            <h1>This is the register page</h1>
            <br></br>
            {message && <>{message}</>}
            <form onSubmit={handleSubmit}>
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
                required/>
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)} type="password" 
                required  placeholder="Password"/>
                <button type="submit">Create Account</button>
            </form>
        </div>
     
    );
  }
  export default Register;