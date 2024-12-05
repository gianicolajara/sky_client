import { getPostByUserService } from "@/services/post";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePostsUser = (limit: number, id?: string) => {
  const getPostsByUser = useInfiniteQuery({
    queryKey: ["getPostsByUser", limit, id],
    queryFn: ({ pageParam }) => getPostByUserService(limit, pageParam, id),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 0,
  });

  return {
    getPostsByUser,
  };
};
