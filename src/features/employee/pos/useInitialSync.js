import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {syncInitialData} from "../../../services/initialSync";

export function useInitialSync() {
  const queryClient = useQueryClient();

  const {
    mutate: syncData,
    isPending: isSyncing,
    error,
    data,
  } = useMutation({
    mutationFn: async () => {
      const promise = syncInitialData().then((res) => {
        queryClient.invalidateQueries({queryKey: ["pos-menu"]});
        queryClient.invalidateQueries({queryKey: ["categories"]});
        queryClient.invalidateQueries({queryKey: ["pos-branch"]});
        return res;
      });

      toast.promise(promise, {
        loading: "Syncing data...",
        success: "Data synced successfully",
        error: (err) => err?.message || "Failed to sync data",
      });

      return promise;
    },
  });

  return {
    syncData,
    isSyncing,
    isLoading: isSyncing,
    refetch: syncData,
    error,
    data,
  };
}

export default useInitialSync;
