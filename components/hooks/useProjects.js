import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../../redux/slices/projectsSlice';

export default function useProjects(user_id) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects);

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            let response;
            try {
                const response = await axios.get(
                    `${API_URL}/projects?user_id=${user_id}`
                )
                const data = await response.data;
                dispatch(setProjects(data));
                setLoading(false);
            } catch (error) {
                console.log(error);
                if (error.response.status !== 0) {
                    dispatch(setProjects([]));
                    setLoading(false);
                    return;
                }
                dispatch(setProjects(null));
                setLoading(false);
            }
        }
        fetchData();
    }, [dispatch, user_id]);

    return {
        projects,
        loading,
    };
}
