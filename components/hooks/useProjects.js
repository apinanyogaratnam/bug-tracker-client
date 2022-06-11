import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProjects(user_id) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            let response;
            try {
                const response = await axios.get(
                    `${API_URL}/projects?user_id=${user_id}`
                )
                const data = await response.data;
                setProjects(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                if (error.response.status !== 0) {
                    setProjects([]);
                    setLoading(false);
                    return;
                }
                setProjects(null);
                setLoading(false);
            }
        }
        fetchData();
    }, [projects, user_id]);

    return {
        projects,
        loading,
    };
}
