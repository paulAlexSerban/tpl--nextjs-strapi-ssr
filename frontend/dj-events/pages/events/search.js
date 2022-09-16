import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import qs from "qs";
import { useRouter } from "next/router";

/**
 * @name: Events Search
 * @type: Page
 */

// all the logic in here is on the FE
export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
    <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

// all the logic that starts here is on the BE
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          { name: { $containsi: term } },
          { performers: { $containsi: term } },
          { description: { $containsi: term } },
          { venue: { $containsi: term } },
        ],
      },
    },
    { encode: false }
  );

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const json = await res.json();
  const events = json.data;

  return {
    props: { events },
  };
}

/**
 * @todo
 * - RESEARCH getServerSideProps VS getStaticProps
 */
