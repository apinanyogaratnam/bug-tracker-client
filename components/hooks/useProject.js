import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProject(project_id) {
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (project_id) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        let response;
        try {
            response = await axios.get(`${API_URL}/project/${project_id}`);
        } catch (error) {
            console.log(error);
            if (error.response || error.request) {
                setProject([]);
                setLoading(false);
                return;
            }
            setProject(undefined);
            setLoading(false);
            return;
        }
        const data = await response.data;
        setProject(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(project_id);
    }, [project_id]);

    return {
        project,
        loading
    };
}
