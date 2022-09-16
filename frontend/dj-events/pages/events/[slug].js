import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/event.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from '@/helpers/index';
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from 'next/router';

/**
 * @name: Event Showcase
 * @type: Page
 */

export default function EventPage({ evt }) {
  const { attributes, id } = evt;
  
  const router = useRouter();

  const deleteEvent = async (e) => {
    e.preventDefault();
    if(confirm('Are you sure ?')) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if(!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
  };
  
  const image = attributes.image.data && attributes.image.data.attributes.formats.medium.url;
  
  return (
    <Layout title="Single event">
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(attributes.date).toLocaleDateString('en-US')} at {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        <ToastContainer />
        {attributes.image && (
          <div className={styles.image}>
            <Image src={ image ? image : '/images/event-default.png'} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{attributes.performers}</p>
        <h3>Description:</h3>
        <p>{attributes.description}</p>
        <h3>Venue: {attributes.venue}</h3>
        <p>{attributes.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// for Server-Side Rendering
export async function getServerSideProps({query:{slug}}) {
const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`);
const json = await res.json();
const events = json.data;
  return {
    props: {
      evt: events[0]
    }
  }
}
