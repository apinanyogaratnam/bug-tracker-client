import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useUser(user) {
    const [fetchedUser, setFetchedUser] = useState({});
    const [fetchedLoading, setFetchedLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (user) => {
            if (!user || error) return { fetchedUser, fetchedLoading };
            const email = user.email;
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            try {
                const { data } = await axios.get(`${API_URL}/user/${email}`);
                setFetchedUser(data);
                setFetchedLoading(false);
            } catch (error) {
                console.log(error);
                if (error.response.status != 0) {
                    setFetchedUser({});
                    setFetchedLoading(false);
                    return;
                }
                setFetchedUser(null);
                setLoading(false);
            }
        }
        fetchData(user);
    }, [user]);

    return {
        fetchedUser,
        fetchedLoading,
    };
}
