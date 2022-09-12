import Link from 'next/link';
import styles from "@/styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href="/about">
          <a>About this project ;)</a>
        </Link>
      </p>
    </footer>
  )
}