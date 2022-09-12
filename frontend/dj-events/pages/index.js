import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

// all the logic in here is on the FE
export default function HomePage({events}) {
  console.log({events})
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
}

// all the logic that starts here is on the BE
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {events},
    revalidate: 1
  }
}

/**
 * @todo
 * - RESEARCH getServerSideProps VS getStaticProps
 */