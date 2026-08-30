import {Pagination as PaginationUI} from "@heroui/react";
import {PAGE_SIZE} from "../utils/constants";
import {useSearchParams} from "react-router-dom";

function Pagination({count}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === totalPages ? totalPages : currentPage + 1;
    setSearchParams({page: next});
  }

  function prevPage() {
    const prev = currentPage === 1 ? 1 : currentPage - 1;
    setSearchParams({page: prev});
  }

  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, count);

  return (
    <PaginationUI className="w-full">
      <PaginationUI.Summary>
        Showing {from}-{to} of {count || 0} results
      </PaginationUI.Summary>
      <PaginationUI.Content>
        <PaginationUI.Item>
          <PaginationUI.Previous
            isDisabled={currentPage === 1}
            onPress={() => prevPage()}>
            <PaginationUI.PreviousIcon />
            <span>Previous</span>
          </PaginationUI.Previous>
        </PaginationUI.Item>

        <PaginationUI.Item>
          <PaginationUI.Next
            isDisabled={currentPage === totalPages}
            onPress={() => nextPage()}>
            <span>Next</span>
            <PaginationUI.NextIcon />
          </PaginationUI.Next>
        </PaginationUI.Item>
      </PaginationUI.Content>
    </PaginationUI>
  );
}

export default Pagination;
