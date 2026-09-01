import {useQuery} from "@tanstack/react-query";
import {getBranches} from "../../../services/apiBranches";

function useBranches() {
  const {
    data: branches,
    isPending: isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });

  return {branches, isLoading, error, refetch};
}

export default useBranches;
