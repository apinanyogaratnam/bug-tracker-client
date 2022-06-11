import Head from 'next/head'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bug Tracker</h1>
      <button>Login</button>
      <button>Signup</button>
    </div>
  )
}
