"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

function Filter() {
  // in NEXT.JS we do these steps to set search querry
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    // it just set internally but doesnot navigate to that route
    params.set("capacity", filter);

    // Update the URL with the new search params
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabin
      </Button>

      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : " "
      } px-5 py-2 hover:bg-primary-700`}
    >
      {children}
    </button>
  );
}

export default Filter;
