import {type FormEvent, useState} from "react";
import {api} from "../api/api.ts";
import {useAuthStore} from "../store/authStore.ts";
import "../style/Tasks.css";
import "../style/Settings.css";
import {useOutletContext} from "react-router-dom";
import type {AppOutletContext} from "../layouts/AppLayout.tsx";

function Settings(){
    const {user, refreshUser} = useOutletContext<AppOutletContext>();
    const [name,setName]=useState(user?.name ?? "");
    const [email,setEmail]=useState(user?.email ?? "");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordErrorOpen,setIsPasswordErrorOpen]= useState(false);
    const logout=useAuthStore((state) => state.logout);
    const setToken=useAuthStore((state) => state.setToken);

    const deleteUser=async () =>{
        if (!window.confirm("Delete your account and all of its tasks? This cannot be undone.")) return;

        try{
            await api.delete("/account");
            logout();
        } catch {
            setErrorMessage("Could not delete the account.");
        }
    };

    const updateNameOrEmail=async (e: FormEvent) =>{
        e.preventDefault();
        setMessage("");
        setErrorMessage("");

        const changes: {name?: string; email?: string} = {};
        if (user && name !== user.name) changes.name = name;
        if (user && email !== user.email) changes.email = email;

        if (Object.keys(changes).length === 0) {
            setMessage("Nothing changed.");
            return;
        }

        try{
            const response = await api.patch("/account", changes);
            const {accessToken, refreshToken} = response.data;
            setToken(accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            await refreshUser();
            setMessage("Profile updated.");
        } catch {
            setErrorMessage("Could not update the profile. The email may already be in use.");
        }
    };

    const updatePassword=async (e: FormEvent) =>{
        e.preventDefault();
        setMessage("");
        setErrorMessage("");

        if(confirmPassword !== password) {
            setIsPasswordErrorOpen(true);
            return;
        }

        try {
            await api.post("/account", {password});
            setPassword("");
            setConfirmPassword("");
            setMessage("Password updated.");
        } catch {
            setErrorMessage("Could not update the password.");
        }
    };

    return(
        <section className="settings-page">
            <span className="page-eyebrow">Preferences</span>
            <h1>Settings</h1>
            <p className="page-description">Manage your profile, password and account.</p>

            {message && <p className="settings-message" role="status">{message}</p>}
            {errorMessage && <p className="settings-error" role="alert">{errorMessage}</p>}

            <form onSubmit={updateNameOrEmail} className="settings-card">
                <div>
                    <strong>Profile</strong>
                    <div className="settings-fields">
                        <div className="settings-field">
                            <label htmlFor="settings-name">Name</label>
                            <input id="settings-name" type="text" value={name} minLength={3} maxLength={100} required onChange={(e) =>setName(e.target.value)}/>
                        </div>
                        <div className="settings-field">
                            <label htmlFor="settings-email">Email</label>
                            <input id="settings-email" type="email" value={email} maxLength={270} required onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="settings-pill">Save profile</button>
            </form>

            <form onSubmit={updatePassword} className="settings-card">
                <div>
                    <strong>Password</strong>
                    <div className="settings-fields">
                        <div className="settings-field">
                            <label htmlFor="settings-password">New password</label>
                            <input id="settings-password" type="password" value={password} minLength={6} maxLength={220} autoComplete="new-password" required onChange={(e) =>setPassword(e.target.value)}/>
                        </div>
                        <div className="settings-field">
                            <label htmlFor="settings-password-confirm">Confirm password</label>
                            <input id="settings-password-confirm" type="password" value={confirmPassword} minLength={6} maxLength={220} autoComplete="new-password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="settings-pill">Change password</button>
            </form>

            <div className="settings-card">
                <div><strong>Delete account</strong><p>Permanently delete the account and all tasks.</p></div>
                <button type="button" onClick={deleteUser} className="settings-pill settings-danger">Delete account</button>
            </div>

            {isPasswordErrorOpen && (
                <div className="modal_overlay" onClick={() => setIsPasswordErrorOpen(false)}>
                    <div className="modal_content" role="dialog" aria-modal="true" aria-labelledby="password-error-title" onClick={(e) => e.stopPropagation()}>
                        <h2 id="password-error-title">The passwords do not match.</h2>
                        <button type="button" className="settings-pill modal-close" onClick={() => setIsPasswordErrorOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Settings;
