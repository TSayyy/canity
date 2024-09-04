import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";

import { OrdersTable } from "../components/OrdersTable";

const PAGE_SIZE = 10;
export function DashboardOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debounceSearch = useDebouncedCallback((value) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  }, 500);

  const page = searchParams.get("page") || 1;
  // fetch orders
  const { data: response, isLoading } = useGetData(`/applications?page=${page}&size=${PAGE_SIZE}`);
  const { data } = response || {};
  const { applications, applicationCnt } = data || {};
  const pagesNumber = Math.ceil(applicationCnt / PAGE_SIZE);
  return (
    <main>
      <section className="shadow-custom rounded-xl py-6  mb-10">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-6 mb-5">
          <h1 className=" text-2xl font-semibold ">Orders</h1>
          <div className="flex gap-2 justify-end items-center">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                debounceSearch(value);
              }}
              className="min-w-48 bg-gray-100"
            />
          </div>
        </header>
        {isLoading ? <LoadingPage /> : <OrdersTable orders={applications} />}
      </section>
      {pagesNumber > 1 && <Paginate pageCount={pagesNumber} />}
    </main>
  );
}
