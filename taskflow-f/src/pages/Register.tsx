import {type FormEvent, useState} from "react";
import axios from "axios";
import "../style/Login.css";
import {useAuthStore} from "../store/authStore.ts";
import {useNavigate} from "react-router-dom";

function Register(){

    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [name,setName]=useState("");
    const setToken=useAuthStore((state) => state.setToken)
    const navigate=useNavigate();

    const handleSubmit= async (e: FormEvent) =>{
        e.preventDefault();
        try {
            const response=await axios.post("http://localhost:8080/api/register",{
                name,
                email,
                password
            });
            const { accessToken, refreshToken } = response.data;

            setToken(accessToken);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/tasks")

        }catch (error) {
            console.error("Ошибка при отправке:", error);
        }}

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className={"login_card"}>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) =>setName(e.target.value)}/>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button_login" type="submit">Register</button>
                </div>

            </form>

        </div>

    )
}
export default Register;