import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

// all the logic in here is on the FE
export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => <EventItem key={evt.id} evt={evt}/>)}

    </Layout>
  );
}

// all the logic that starts here is on the BE
export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&[populate]=*`);
  const json = await res.json();
  const events = json.data

  return {
    props: { events }
  };
}

/**
 * @todo
 * - RESEARCH getServerSideProps VS getStaticProps
 */
