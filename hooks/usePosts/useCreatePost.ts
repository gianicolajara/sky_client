import { createPostService } from "@/services/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";

export const useCreatePost = () => {
  const client = useQueryClient();
  const { error: errorToast, success: successToast } = useToast();

  const createPostMutate = useMutation({
    mutationKey: ["createPost"],
    mutationFn: ({ post, token }: { post: FormData; token?: string }) =>
      createPostService(post, token),
    onSuccess: () => {
      successToast("Post created");

      client.invalidateQueries({
        queryKey: ["getPostsByFollowing"],
        refetchType: "all",
        stale: true,
        type: "all",
      });

      client.refetchQueries({
        queryKey: ["getPostsByFollowing"],
        stale: true,
        type: "all",
      });
    },
    onError: () => {
      errorToast("Error creating post");
    },
  });

  return {
    createPostMutate,
  };
};
