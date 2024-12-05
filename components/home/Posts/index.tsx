"use client";

import ButtonIconLoading from "@/components/shared/Button/ButtonIcon";
import ButtonLoading from "@/components/shared/Button/ButtonLoading";
import Loading from "@/components/shared/Loading";
import PostListContent from "@/components/shared/Posts/PostListContent";
import { TypographySmall } from "@/components/shared/TypographySmall";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthContext } from "@/contexts/Auth";
import useCsrf from "@/hooks/useCsrf";
import { usePosts } from "@/hooks/usePosts";
import { useCreatePost } from "@/hooks/usePosts/useCreatePost";
import { cn } from "@/lib/utils";
import { CreatePostType, postSchema } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, PenOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import CreatePostForm from "../Forms/CreatePostForm";

const PostsHome = () => {
  const { ref, inView } = useInView();

  const { user } = useContext(AuthContext);

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const classesnames = cn({ hidden: !openCreatePost, block: openCreatePost });

  const {
    getPostsByFollowing: {
      data: postsData,
      fetchNextPage,
      isLoading,
      hasNextPage,
      isSuccess,
    },
  } = usePosts(5);

  const {
    getCsrfToken: { mutateAsync: getCsrfToken, isPending: isLoadingCsrf },
  } = useCsrf();

  const {
    createPostMutate: { mutate: createPost, isPending: isCreatePending },
  } = useCreatePost();

  const form = useForm<CreatePostType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      postMedia: "" as unknown as FileList,
      title: "",
    },
  });

  const handleSubmit = async (data: CreatePostType) => {
    const token = await getCsrfToken();

    const formData = new FormData();

    const listOfFiles = Array.from(data.postMedia as FileList);

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("authorId", user?.id ?? "");

    if (data.postMedia) {
      for (const element of listOfFiles) {
        formData.append("postMedia", element);
      }
    }

    createPost(
      { post: formData, token },
      {
        onSuccess: () => {
          form.reset();
          setOpenCreatePost(false);
        },
      }
    );
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="w-full h-full overflow-y-auto scrollbar-thin border-2 rounded-lg">
        <Card className="w-full h-full border-0">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            {isSuccess && (
              <PostListContent postsData={postsData} idUser={user?.id} />
            )}
          </CardContent>
          <CardFooter>
            {isLoading && <Loading />}

            {postsData && postsData.pages.length > 0 && (
              <div ref={ref}>{isLoading && <Loading />}</div>
            )}

            {!isLoading && !hasNextPage && (
              <TypographySmall>No more posts</TypographySmall>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="flex-col gap-y-2 hidden lg:flex">
        <Card className={classesnames}>
          <CardHeader>
            <CardTitle>Crear Post</CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                className="w-full flex flex-col gap-y-2 border-2 p-2 rounded-lg"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <CreatePostForm formUtility={form} />
                <ButtonLoading isLoading={isLoadingCsrf || isCreatePending}>
                  Post
                </ButtonLoading>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
        <ButtonIconLoading
          variant={"secondary"}
          Icon={openCreatePost ? <PenOff /> : <Pen />}
          onClick={() => setOpenCreatePost(!openCreatePost)}
        ></ButtonIconLoading>
      </div>
    </div>
  );
};

export default PostsHome;
