import { UpdateSchemaType } from "@/schemas/update";
import { updateService } from "@/services/update";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateUser = () => {
  const client = useQueryClient();

  const updateUser = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: ({
      id,
      data,
      csrfToken,
    }: {
      id: string;
      data: UpdateSchemaType;
      csrfToken?: string;
    }) => updateService(data, id, csrfToken),
    onSuccess: (data, { id }) => {
      client.invalidateQueries({
        queryKey: ["checkAuth"],
      });

      client.invalidateQueries({
        queryKey: ["user", id],
      });
    },
  });

  return { updateUser };
};

export default useUpdateUser;
