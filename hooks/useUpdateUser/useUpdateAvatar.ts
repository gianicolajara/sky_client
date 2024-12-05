import { updateAvatarService } from "@/services/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateAvatar = () => {
  const client = useQueryClient();

  const updateAvatar = useMutation({
    mutationKey: ["updateAvatar"],
    mutationFn: ({
      data,
      token,
      id,
    }: {
      data: FormData;
      token?: string;
      id: string;
    }) => updateAvatarService(data, id, token),
    onSuccess: (data, { id }) => {
      client.refetchQueries({
        queryKey: ["user", id],
      });

      client.refetchQueries({
        queryKey: ["checkAuth"],
      });
    },
  });

  return { updateAvatar };
};
