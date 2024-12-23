import { createContext, useEffect, useContext, useState } from 'react';

export const DataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
}
// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch blogs function
    const fetchBlogs = async () => {
        try {
            const blogResponse = await fetch("/api/portfolio/blogs");
            if (!blogResponse.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const blogData = await blogResponse.json();
            setBlogs(blogData.data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Fetch projects function
    const fetchProjects = async () => {
        try {
            const projectResponse = await fetch("/api/portfolio/projects");
            if (!projectResponse.ok) {
                throw new Error('Failed to fetch projects');
            }
            const projectData = await projectResponse.json();
            
            setProjects(projectData.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const refreshBlogs = async () => {
        setLoading(true);
        await fetchBlogs(); 
        setLoading(false);  
    };

    const refreshProjects = async () => {
        setLoading(true);
        await fetchProjects(); 
        setLoading(false); 
    };

    useEffect(() => {
        refreshBlogs();
        refreshProjects(); 
        
    }, []);

    return (
        <DataContext.Provider value={{ blogs, projects, loading, setLoading, error, refreshBlogs, refreshProjects }}>
            {children}
        </DataContext.Provider>
    );
};
