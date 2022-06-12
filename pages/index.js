import Head from 'next/head'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import useUser from '../components/hooks/useUser';
import { setUserId } from '../redux/slices/userSlice';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0';

export default function Home() {
  const router = useRouter();
  const { user: auth0User, error } = useAuth0User();
  const { fetchedUser: user, fetchedLoading: loading } = useUser(auth0User);

  const handleAuthentication = () => {
    router.push('/api/auth/login');
  };

  const handleRouteToProjects = () => {
    if (error) {
      return <p>Error: {error.message}</p>;
    }

    if (user && user != {}) {
      console.log('fetched user', user);
      setUserId(user.user_id);
      router.push('/projects');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bug Tracker</h1>
      { !auth0User && <button onClick={handleAuthentication}>Login or Signup</button> }
      { auth0User && <button onClick={handleRouteToProjects}>Go to Projects</button>}
    </div>
  )
}
