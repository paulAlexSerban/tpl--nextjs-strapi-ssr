import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventsPage({ evt }) {
  return (
    <Layout title="Single event">
      <h1>{evt.name}</h1>
    </Layout>
  );
}

// for Server-Side Generation
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return {
    paths,
    fallback: false // (1)
  };
}

/**
 * @notes
 * 1. false is recommended for SSG, true is for SSR
 */

export async function getStaticProps({ params: { slug } }) {
  console.log(slug);
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1
  };
}

// for Server-Side Rendering
// export async function getServerSideProps({query:{slug}}) {
//   console.log(slug);
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       evt: events[0]
//     }
//   }
// }
