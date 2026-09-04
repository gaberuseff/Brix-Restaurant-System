import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getModifiers} from "../../../services/apiModifires";

function useModifires() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: {data: modifiers, count} = {},
    isPending: isModifiersPending,
  } = useQuery({
    queryKey: ["modifiers", page],
    queryFn: () => getModifiers(page),
  });

  return {modifiers, count, isModifiersPending};
}

export default useModifires;

