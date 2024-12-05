"use client";

import ButtonIconLoading from "@/components/shared/Button/ButtonIcon";
import ButtonLoading from "@/components/shared/Button/ButtonLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/Auth";
import useCsrf from "@/hooks/useCsrf";
import { useCreatePost } from "@/hooks/usePosts/useCreatePost";
import { CreatePostType, postSchema } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreatePostForm from "../Forms/CreatePostForm";

const CreatePostFloat = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const {
    getCsrfToken: { mutateAsync: getCsrfToken },
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
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="fixed bottom-8 right-8 block lg:hidden">
        <ButtonIconLoading
          variant="secondary"
          Icon={<Pen size={20} color="white" />}
          className="w-12 h-12 rounded-full"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
          <DialogDescription>here you can create a post</DialogDescription>
        </DialogHeader>
        <Card>
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
                <ButtonLoading type="submit" isLoading={isCreatePending}>
                  Post
                </ButtonLoading>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostFloat;
