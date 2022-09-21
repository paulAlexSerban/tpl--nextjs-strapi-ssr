import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

/**
 * @name: Events List
 * @type: Page
 */

// all the logic in here is on the FE
export default function EventsPage({ events, total, page }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events yet</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {/* Button to Previous Page */}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary" style={{ float: "right" }}>
            Next
          </a>
        </Link>
      )}

      {/* Button to Next Page */}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
    </Layout>
  );
}

// all the logic that starts here is on the BE
export async function getServerSideProps({ query: { page = 1 } }) {
  /** Calculate start page
   * const start =
   * // "+page" converts it to a number
   * +page === 1
   * ? // the beggining of the events
   * 0
   * : // calculate the start (current page)
   * (+page - 1) * PER_PAGE;
   */
  const start = parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * PER_PAGE;
  /** Fetch Number Of Events
   * @note - Not needed as the total number of events is returned in meta - so no need of two requests
   * const totalRes = await fetch(`${API_URL}/api/events?pagination[withCount]=true`);
   * const totalData = await totalRes.json();
   * const total = totalData.meta.pagination.total;
   * console.log({ total });
   */

  const res = await fetch(
    /** Example endpoint URLs
     * http://localhost:1337/api/events?pagination[page]=1&pagination[pageSize]=2
     * `${API_URL}/api/events?populate=*&_sort=date:ASC&?filters[_limit][$eq]=${PER_PAGE}`
     * `${API_URL}/api/events?pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}&populate=*`
     */
    `${API_URL}/api/events?sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`
  );
  const json = await res.json();
  const events = json.data;

  return {
    props: {
      events: events,
      page: parseInt(page),
      total: json.meta.pagination.total,
    },
  };
}

/**
 * @todo
 * - RESEARCH getServerSideProps VS getStaticProps
 */
