import { getPostByFollowingService } from "@/services/post";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = (limit: number) => {
  const getPostsByFollowing = useInfiniteQuery({
    queryKey: ["getPostsByFollowing", limit],
    queryFn: ({ pageParam }) => getPostByFollowingService(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 0,
  });

  return {
    getPostsByFollowing,
  };
};
