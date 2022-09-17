import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from 'next/link';

// all the logic in here is on the FE
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => <EventItem key={evt.id} evt={evt}/>)}
      {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
}

// all the logic that starts here is on the BE
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3&[populate]=*`);
  const json = await res.json();
  const events = json.data

  return {
    props: { events },
    revalidate: 1
  };
}

/**
 * @todo
 * - RESEARCH getServerSideProps VS getStaticProps
 */
