import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {updateSettings as updateSettingsApi} from "../../../services/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {mutate: updateSettings, isPending: isUpdating} = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({queryKey: ["settings"]});
    },
    onError: (err) => {
      toast.danger(err?.message || "Failed to update settings");
    },
  });

  return {updateSettings, isUpdating};
}

export default useUpdateSettings;
