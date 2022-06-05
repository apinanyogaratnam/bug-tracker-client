import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProjects(project_id) {
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (project_id) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(
            `${API_URL}/project/${project_id}`
        )
        const data = await response.data;
        setProject(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(user_id);
    }, [project, project_id]);

    return {
        project,
        loading
    };
}
