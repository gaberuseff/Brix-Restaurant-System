import {useQuery} from "@tanstack/react-query";
import {getStaff} from "../../../services/apiStaff";

function useStaff() {
  const {data: staff, isPending: isLoadingStaff} = useQuery({
    queryKey: ["staff"],
    queryFn: () => getStaff(),
  });

  return {staff, isLoadingStaff};
}

export default useStaff;
