import {type FormEvent, useState} from "react";
import "../style/Login.css";
import {useAuthStore} from "../store/authStore.ts";
import { useNavigate } from "react-router-dom";
import {api} from "../api/api.ts";

function Login(){

    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);


    const handleSubmit= async (e: FormEvent) =>{
        e.preventDefault();
        try {
            const response=await api.post("/login",{
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className={"login_card"}>
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
                <button className="button_login" type="submit">Login</button>
            </div>

        </form>

        </div>

    )
}
export default Login;