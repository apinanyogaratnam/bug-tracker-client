import { useState, useEffect } from 'react';

export default function useProjects(user_id) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (user_id) => {
        const response = await fetch(`${process.env.API_URL}/projects?user_id=${user_id}`);
        const data = await response.json();
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
