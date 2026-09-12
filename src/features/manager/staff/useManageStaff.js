import {toast} from "@heroui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
  blockUser as blockUserApi,
  deleteUser as deleteUserApi,
  unblockUser as unblockUserApi,
} from "../../../services/apiStaff";

export function useManageStaff() {
  const queryClient = useQueryClient();

  const {mutate: blockStaff, isPending: isBlocking} = useMutation({
    mutationFn: (userId) => blockUserApi(userId),
    onSuccess: () => {
      toast.success("User blocked successfully", {
        description:
          "The user has been blocked in Auth and marked as inactive.",
      });
      queryClient.invalidateQueries({queryKey: ["staff"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to block user");
    },
  });

  const {mutate: unblockStaff, isPending: isUnblocking} = useMutation({
    mutationFn: (userId) => unblockUserApi(userId),
    onSuccess: () => {
      toast.success("User unblocked successfully", {
        description:
          "The user has been unblocked in Auth and marked as active.",
      });
      queryClient.invalidateQueries({queryKey: ["staff"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to unblock user");
    },
  });

  const {mutate: deleteStaff, isPending: isDeleting} = useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    onSuccess: () => {
      toast.success("User deleted successfully", {
        description:
          "The user has been removed completely from Auth and Profiles.",
      });
      queryClient.invalidateQueries({queryKey: ["staff"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to delete user");
    },
  });

  return {
    blockStaff,
    unblockStaff,
    deleteStaff,
    isBlocking,
    isUnblocking,
    isDeleting,
  };
}

export default useManageStaff;
