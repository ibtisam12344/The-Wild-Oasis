import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// Incremental Static Regeneration: update static pages at runtime without rebuilding the entire site.
//ROUTE LEVEL REVALIDATION - should be apply in static pages
export const revalidate = 0;

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  // searchParams : ?name="ibtisam" , {name:"ibtisam"} , it also make the page dynamic so we dont need revalidate as well
  // whenever this searchparams changes or URL changes , this server component rerender
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* // Dynamic Hole */}
      {/* as we sleect filter, there is no spinner but delay will be seen because it is the default behaviour of suspense and in navigation in next js is always wrapped in transition and in transition suspense will not hide the content which was rendered earlier and not render the fallback, it will just wait and swap it out as soon as the new content arrives , to fix that by passing a unqiue KEY then it will show a fallback(SPINNER) again */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
