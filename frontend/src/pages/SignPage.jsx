import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './SignPage.css';
import { useAuthContext } from '../context/AuthContext';

const SignPage = () => {
    console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
    const { setAuthUser } = useAuthContext();
    const [loginData, setLoginData] = useState({ username: '', password: '' });

    useEffect(() => {
        const loadGoogleApi = () => {
            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        };
        loadGoogleApi();
    }, []);

    const handleGoogleLogin = () => {
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, 
            });

            auth2.signIn().then((googleUser) => {
                const id_token = googleUser.getAuthResponse().id_token;

                fetch('/api/auth/google/callback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_token }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Login successful:', data);
                        // Handle successful login (e.g., redirect, save user data, etc.)
                    })
                    .catch(error => {
                        console.error('Error during Google login:', error);
                    });
            }).catch((error) => {
                console.error('Error signing in with Google:', error);
            });
        });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = loginData;

        // Validation
        if (!username || !password) {
            toast.error("Both fields are required.");
            return;
        }

        if (password.length <= 5) {
            toast.error("Password must be at least 5 characters long.");
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', loginData);
            console.log('Login successful:', response.data);
            toast.success("Login successful!");
            setAuthUser(response.data);
            localStorage.setItem("chatanya-portfolio", JSON.stringify(response.data));
        } catch (error) {
            console.error('Login failed:', error);
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="z-10 h-full min-h-screen mb-20 w-full relative dark:bg-white dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12"
            style={{ maxWidth: "1600px" }}>
            <Toaster />
            <div className="signpage-container">
                <div className="signpage-left">
                    <div className="signpage-welcome-message">
                        <h1>Welcome!</h1>
                        <p>We`re glad to have you back.</p>
                    </div>
                </div>
                <div className="signpage-right">
                    <div className="signpage-login-box">
                        <div className="signpage-login-title">
                            <h2>Login</h2>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="signpage-input-box">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div className="signpage-input-box">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="signpage-login-button">Login</button>
                        </form>

                        <button onClick={handleGoogleLogin} className="signpage-google-button">
                            Login with Google
                        </button>

                        {/* Forgot password and sign up links */}
                        <div className="signpage-login-options">
                            <a href="/forgot-password">Forgot password?</a>
                            <a href="/signup">Don`t have an account? Sign up</a>
                        </div>

                        {/* Divider with "or" in the middle */}
                        <div className="signpage-divider">or</div>

                        {/* Social login icons */}
                        <div className="signpage-social-login">
                            <i className="fa-brands fa-google"></i>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-apple"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignPage;
