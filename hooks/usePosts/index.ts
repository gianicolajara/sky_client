import { getPostByFollowingService } from "@/services/post";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = (limit: number) => {
  const getPostsByFollowing = useInfiniteQuery({
    queryKey: ["getPostsByFollowing", limit],
    queryFn: ({ pageParam }) => getPostByFollowingService(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.posts.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    notifyOnChangeProps: ["data"],
    experimental_prefetchInRender: true,
  });

  return {
    getPostsByFollowing,
  };
};
