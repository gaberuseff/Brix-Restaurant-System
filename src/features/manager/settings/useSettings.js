import {useQuery} from "@tanstack/react-query";
import {getSettings} from "../../../services/apiSettings";

function useSettings() {
  const {
    data: settings = {},
    isPending: isSettingsLoading,
    isError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {settings, isSettingsLoading, isError};
}

export default useSettings;
