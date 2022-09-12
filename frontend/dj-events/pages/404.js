import Layout from '@/components/Layout';
import Link from 'next/link';
import styles from '@/styles/404.module.scss';
import {FaExclamationTriangle} from 'react-icons/fa';

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
    <div className={styles.error}>
      <h1><FaExclamationTriangle /> 404</h1>
      <p>Sorry, there is nothing here!</p>
      <Link href="/">
        <a>Go back home!</a>
      </Link>
    </div>
    </Layout>
  )
}