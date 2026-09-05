import {type FormEvent, useState} from "react";
import "../style/Login.css";
import {useAuthStore} from "../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import {publicApi} from "../api/api.ts";

function Register(){

    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [name,setName]=useState("");
    const setToken=useAuthStore((state) => state.setToken)
    const navigate=useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit= async (e: FormEvent) =>{
        e.preventDefault();
        setErrorMessage("");
        try {
            const response=await publicApi.post("/register",{
                name,
                email,
                password
            });
            const { accessToken, refreshToken } = response.data;

            setToken(accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/tasks")

        }catch (error) {
            setErrorMessage("Registration failed");
            console.error(error);
        }}

    return(
        <div>
            <h1>Register</h1>
            {errorMessage && <p>{errorMessage}</p>}
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