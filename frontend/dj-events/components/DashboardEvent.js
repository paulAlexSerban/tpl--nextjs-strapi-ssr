import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/dashboardEvent.module.scss";

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.attributes.slug}`}>
          <a>{evt.attributes.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a href="#" className={styles.delete} onClick={() => handleDelete(evt.id)}>
        <FaTimes /> <span>Delete Event</span>
      </a>
    </div>
  );
}
