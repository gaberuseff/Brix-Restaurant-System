import {useQuery} from "@tanstack/react-query";
import {branchRepository} from "../../../repositories/branch.repository";

function usePosBranch() {
  const {
    data: branch = {},
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pos-branch"],
    queryFn: branchRepository.getBranch,
    staleTime: 1000 * 60 * 5,
  });

  return {branch, isLoading, error, refetch};
}

export default usePosBranch;
