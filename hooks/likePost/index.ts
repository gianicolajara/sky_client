import { likePostService, unlikePostService } from "@/services/like";
import { Like } from "@/types/like";
import { Post } from "@/types/post";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useToast from "../useToast";

const useLikePost = ({ idUser }: { idUser?: string }) => {
  const { error: errorToast } = useToast();

  const queryClient = useQueryClient();

  const updateLikeView = async ({
    data,
    queryKey,
    postId,
    limit = 5,
    like = true,
  }: {
    postId: string;
    data: Like;
    queryKey: string;
    limit?: number;
    like?: boolean;
  }) => {
    const query = [queryKey, limit];

    if (idUser) query.push(idUser);

    queryClient.setQueryData(
      query,
      (
        oldData:
          | InfiniteData<
              {
                posts: Post[];
                nextPage: number;
              },
              unknown
            >
          | undefined
      ) => {
        if (oldData) {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likes: like ? [{ ...data }] : [],
                    _count: {
                      ...post._count,
                      likes: like
                        ? post._count.likes + 1
                        : post._count.likes - 1,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        }
        return oldData;
      }
    );
  };

  const likePost = useMutation({
    mutationKey: ["likePost"],
    mutationFn: ({
      authorId,
      postId,
      token,
    }: {
      authorId: string;
      postId: string;
      token: string;
    }) => likePostService(authorId, postId, token),
    onError(error) {
      errorToast(error.message);
    },
    onSuccess(data, { postId }) {
      updateLikeView({
        data,
        postId,
        queryKey: "getPostsByFollowing",
      });

      updateLikeView({
        data,
        postId,
        queryKey: "getPostsByUser",
      });
    },
  });

  const unlikePost = useMutation({
    mutationKey: ["unlikePost"],
    mutationFn: ({
      authorId,
      postId,
      token,
    }: {
      authorId: string;
      postId: string;
      token: string;
    }) => unlikePostService(authorId, postId, token),
    onError(error) {
      errorToast(error.message);
    },
    onSuccess: (data, { postId }) => {
      updateLikeView({
        data,
        postId,
        queryKey: "getPostsByFollowing",
        like: false,
      });

      updateLikeView({
        data,
        postId,
        queryKey: "getPostsByUser",
        like: false,
      });
    },
  });

  return {
    likePost,
    unlikePost,
  };
};

export default useLikePost;
