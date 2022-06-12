import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useUser(user) {
    const [fetchedUser, setFetchedUser] = useState({});
    const [fetchedLoading, setFetchedLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (user) => {
            if (!user) return { fetchedUser, fetchedLoading };
            const email = user.email;
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            try {
                const { data } = await axios.get(`${API_URL}/user/${email}`);
                setFetchedUser(data);
                setFetchedLoading(false);
            } catch (error) {
                console.log(error);
                if (!error.response) {
                    setFetchedUser(null);
                    setFetchedLoading(false);
                    return;
                }
                if (error.response.status === 404) {
                    // User not found, create new user
                    const { data } = await axios.post(`${API_URL}/user`, { email, username: user.name, external_user_id: user.sub, image: user.picture});
                    setFetchedUser(data);
                    setFetchedLoading(false);
                } else if (error.response.status != 0) {
                    setFetchedUser({});
                    setFetchedLoading(false);
                    return;
                }
                setFetchedUser(null);
                setFetchedLoading(false);
            }
        }
        fetchData(user);
    }, [user, fetchedUser, fetchedLoading]);

    return {
        fetchedUser,
        fetchedLoading,
    };
}
