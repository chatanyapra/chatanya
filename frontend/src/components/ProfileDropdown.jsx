import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthContext } from "../context/AuthContext"
import ToggleButton from './ToggleButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { authUser, setAuthUser } = useAuthContext();


    // Toggle dropdown
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/auth/logout');
            console.log('Logout successful:', response.data);
            toast.success("Logout successful!");
            localStorage.removeItem("chatanya-portfolio");
            setAuthUser(null);
        } catch (error) {
            console.error('Login failed:', error);
            toast.error(error.response.data.error);
        }
    }

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
            >
                <FaUserCircle size={30} className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 w-48 h-fit mt-7 origin-top-right bg-[#070a29] dark:bg-gray-200 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                    <div className="py-1 h-fit">
                        {!authUser ? (
                            <Link to={"/sign"}>
                                <button className="w-full px-4 py-2 text-left text-gray-200 dark:text-gray-700 hover:text-gray-700 hover:bg-gray-300">Login</button>
                            </Link>
                        ) : (
                            <>
                                {authUser.isAdmin && (
                                    <>
                                        <Link to={'/projectedit'}>
                                            <button className="w-full px-4 py-2 text-left text-gray-200 dark:text-gray-700 hover:text-gray-700 hover:bg-gray-500">Project Edit</button>
                                        </Link>
                                        <Link to={'/blogedit'}>
                                            <button className="w-full px-4 py-2 text-left text-gray-200 dark:text-gray-700 hover:text-gray-700 hover:bg-gray-500">Blog Edit</button>
                                        </Link>
                                    </>
                                )}
                                <button className="w-full px-4 py-2 text-left text-gray-200 dark:text-gray-700 hover:text-gray-700 hover:bg-gray-300" onClick={handleLogout}>Logout</button>
                            </>
                        )
                        }
                        <button className="w-full px-4 py-1 text-left text-gray-200 dark:text-gray-700 hover:text-gray-700 hover:bg-gray-300 flex justify-between items-center- ">
                            <div className='pt-1.5'>Mode</div> 
                            <div>
                                <ToggleButton />
                            </div> 
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;