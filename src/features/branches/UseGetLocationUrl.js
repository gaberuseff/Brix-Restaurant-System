import {useMutation} from "@tanstack/react-query";
import {getLocationUrl} from "../../utils/helpers";
import {toast} from "@heroui/react";

function useGetLocationUrl() {
  const {mutate: getCurrentLocation, isPending: isGettingLocation} =
    useMutation({
      mutationFn: getLocationUrl,
      onError: () => {
        toast.danger("Failed to get current location");
      },
    });

  return {getCurrentLocation, isGettingLocation};
}

export default useGetLocationUrl;
