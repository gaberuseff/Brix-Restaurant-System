import {useQuery} from "@tanstack/react-query";
import {getModifierGroups} from "../../../services/apiModifires";

function useModifireGroups() {
  const {
    data: modifierGroups,
    isPending: isModifierGroupsPending,
    error,
  } = useQuery({
    queryKey: ["modifier_groups"],
    queryFn: getModifierGroups,
  });

  return {modifierGroups, isModifierGroupsPending, error};
}

export default useModifireGroups;
