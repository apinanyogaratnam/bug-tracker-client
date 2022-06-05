import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProjects(user_id) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (user_id) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(
            `${API_URL}/projects?user_id=${user_id}`
        )
        const data = await response.data;
        setProjects(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(user_id);
    }, [user_id]);

    return {
        projects,
        loading
    };
}
