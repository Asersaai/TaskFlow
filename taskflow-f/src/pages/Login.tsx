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
        <h2>Login</h2>
            {errorMessage && <p role="alert">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
            <div className={"login_card"}>
            <label htmlFor="login-email">Email</label>
            <input
            id="login-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
                <label htmlFor="login-password">Password</label>
                <input
                id="login-password"
                type="password"
                name="password"
                autoComplete="current-password"
                minLength={6}
                required
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
