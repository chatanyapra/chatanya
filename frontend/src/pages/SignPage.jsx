import { useState } from 'react';
import './SignPage.css';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';

const SignPage = () => {
    const { setAuthUser } = useAuthContext();
    const [isActive, setIsActive] = useState(false);
    const [signupData, setSignupData] = useState({ username: '', confirmPassword: '', password: '' });
    const [loginData, setLoginData] = useState({ username: '', password: '' });

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    // Handle signup data change
    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    // Handle login data change
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Handle signup submission
    const handleSignup = async () => {
        const { username, password, confirmPassword } = signupData;

        // Validation
        if (!username || !password || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (password.length <= 5) {
            toast.error("Password must be at least 5 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('/api/auth/signup', signupData);
            console.log('Signup successful:', response.data);
            setAuthUser(response.data);
            toast.success("Signup successful!");
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error(error.response.data.error);
        }
    };

    // Handle login submission
// Handle login submission
const handleLogin = async () => {
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
        setAuthUser(response.data);
        toast.success("Login successful!");
    } catch (error) {
        console.error('Login failed:', error);
        toast.error(error.response.data.error);
    }
};


    return (
        <div className='z-10 h-screen w-full relative app-main dark:bg-white dark:text-white text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12' style={{ maxWidth: "1600px" }}>
            <Toaster />
            <div className="page-body">
                <div className={`main-container ${isActive ? 'active' : ''}`} id="main-container">
                    
                    {/* Sign Up Form */}
                    <div className="form-box signin-form">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <h1 className='text-3xl'>Create Account</h1>
                            <div className="icon-list">
                                <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-youtube"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-x-twitter"></i></a>
                            </div>
                            <span>or use your email for register</span>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={signupData.username}
                                onChange={handleSignupChange}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={signupData.confirmPassword}
                                onChange={handleSignupChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                            />
                            <button type="button" onClick={handleSignup}>Sign Up</button>
                        </form>
                    </div>
                    
                    {/* Sign In Form */}
                    <div className="form-box signup-form">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <h1 className='text-3xl'>Sign In</h1>
                            <div className="icon-list">
                                <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-youtube"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-x-twitter"></i></a>
                            </div>
                            <span>or use your email and password</span>
                            <input
                                type="email"
                                name="username"
                                placeholder="Username"
                                value={loginData.username}
                                onChange={handleLoginChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                            <a href="#">Forgot Password?</a>
                            <button type="button" onClick={handleLogin}>Sign In</button>
                        </form>
                    </div>

                    {/* Toggle Section */}
                    <div className="toggle-section">
                        <div className="toggle-box">
                            <div className="toggle-panel panel-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of the site`s features.</p>
                                <button type="button" className="btn-hidden" onClick={handleLoginClick}>
                                    Sign In
                                </button>
                            </div>

                            <div className="toggle-panel panel-right">
                                <h1>Hello, Subscriber!</h1>
                                <p>Register with your personal details to use all of the site`s features.</p>
                                <button type="button" className="btn-hidden" onClick={handleRegisterClick}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignPage;
