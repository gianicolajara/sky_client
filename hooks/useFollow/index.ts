import { followService, unfollowService } from "@/services/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollow = () => {
  const client = useQueryClient();

  const followMutation = useMutation({
    mutationKey: ["follow"],
    mutationFn: ({
      followedId,
      followerId,
      csrfToken,
    }: {
      followedId: string;
      followerId: string;
      csrfToken?: string;
    }) => followService(followedId, followerId, csrfToken),
    onSuccess: (data, { followedId }) => {
      client.refetchQueries({
        queryKey: ["user", followedId],
      });

      client.refetchQueries({
        queryKey: ["checkAuth"],
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationKey: ["unfollow"],
    mutationFn: ({
      followedId,
      followerId,
      csrfToken,
    }: {
      followedId: string;
      followerId: string;
      csrfToken?: string;
    }) => unfollowService(followedId, followerId, csrfToken),
    onSuccess: (data, { followedId }) => {
      client.refetchQueries({
        queryKey: ["user", followedId],
      });

      client.refetchQueries({
        queryKey: ["checkAuth"],
      });
    },
  });

  return {
    followMutation,
    unfollowMutation,
  };
};

export default useFollow;
