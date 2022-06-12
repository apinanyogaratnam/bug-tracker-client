import Head from 'next/head'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { user, error, loading } = useUser();
  let email, name, picture, sub;

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    email = user.email;
    name = user.name;
    picture = user.picture;
    sub = user.sub;
    router.push('/projects');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bug Tracker</h1>
      <a href="/api/auth/login">Login or Signup</a>
    </div>
  )
}
