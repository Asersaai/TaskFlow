import {type FormEvent, useState} from "react";
import "../style/Login.css";
import {useAuthStore} from "../store/authStore.ts";
import { useNavigate } from "react-router-dom";
import {publicApi} from "../api/api.ts";

function Login(){

    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit= async (e: FormEvent) =>{
        e.preventDefault();
        setErrorMessage("");
        try {
            const response=await publicApi.post("/login",{
                email,
                password
            });
            const { accessToken, refreshToken } = response.data;
            setToken(accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/tasks")
        }catch (error) {
            setErrorMessage("Invalid email or password");
            console.error(error);
        }}

    return(
        <div>
        <h1>Login</h1>
            {errorMessage && <p>{errorMessage}</p>}
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