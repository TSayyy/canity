import { GrNext, GrPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

type PaginateProps = {
  pageCount: number;
};

export function Paginate({ pageCount }: PaginateProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPage = Number(searchParams.get("page") || "1") - 1;
  const handlePageChange = (page: { selected: number }) => {
    searchParams.set("page", (page.selected + 1).toString());
    setSearchParams(searchParams, { replace: true });
  };

  if (pageCount <= 1) return null;
  return (
    <ReactPaginate
      onPageChange={handlePageChange}
      forcePage={selectedPage}
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      nextLabel={<GrNext className=" text-lg" />}
      previousLabel={<GrPrevious className=" text-lg" />}
      containerClassName="flex flex-wrap gap-1 justify-center items-center font-semibold *:transition-all *:duration-300 *:border-2  *:rounded-lg *:w-10 *:h-10 *:flex *:justify-center *:items-center"
      pageClassName="text-neutral-gray border-neutral-gray"
      pageLinkClassName="w-full h-full flex justify-center items-center "
      previousClassName=" border-dark-navy text-dark-navy "
      previousLinkClassName="w-full h-full flex justify-center items-center"
      nextClassName=" border-dark-navy text-dark-navy "
      nextLinkClassName=" w-full h-full flex justify-center items-center"
      breakLabel="..."
      breakClassName=" text-neutral-gray border-neutral-gray"
      breakLinkClassName="border-neutral-gray"
      activeClassName="bg-dark-navy border-dark-navy border-0 text-white"
      activeLinkClassName=" border-dark-navy border-0"
      renderOnZeroPageCount={undefined}
    />
  );
}
