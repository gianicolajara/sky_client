"use client";

import ButtonLoading from "@/components/shared/Button/ButtonLoading";
import InputControlled from "@/components/shared/InputControlled";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/Auth";
import useCsrf from "@/hooks/useCsrf";
import useToast from "@/hooks/useToast";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useUpdateAvatar } from "@/hooks/useUpdateUser/useUpdateAvatar";
import {
  updateAvatarSchema,
  UpdateAvatarSchemaType,
  updateSchema,
  UpdateSchemaType,
} from "@/schemas/update";
import { zodResolver } from "@hookform/resolvers/zod";

import { AxiosError } from "axios";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

const EditProfile = () => {
  const { user } = useContext(AuthContext);

  const { error: errorToast, success: successToast } = useToast();

  const {
    updateUser: { mutate: createUser, isPending: isLoading },
  } = useUpdateUser();

  const {
    getCsrfToken: { mutateAsync: getCsrfToken },
  } = useCsrf();

  const {
    updateAvatar: { mutate: updateAvatar, isPending: isLoadingAvatar },
  } = useUpdateAvatar();

  const formAvatar = useForm<UpdateAvatarSchemaType>({
    resolver: zodResolver(updateAvatarSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const form = useForm<UpdateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      id: user?.id || "",
      email: user?.email || "",
      name: user?.name || "",
      lastname: user?.lastname || "",
      username: user?.username || "",
    },
  });

  const handleSubmit = async (data: UpdateSchemaType) => {
    try {
      const token = await getCsrfToken();

      createUser(
        { data, id: user?.id ?? "", csrfToken: token },
        {
          onSuccess: () => {
            successToast("User updated successfully");
          },
          onError: (error) => {
            const err = (error as AxiosError<{ message: string }>).response
              ?.data.message;
            errorToast(err ?? "Error updating user");
          },
        }
      );
    } catch {
      errorToast("Error updating user");
    }
  };

  const handleUpdateAvatar = async (data: UpdateAvatarSchemaType) => {
    try {
      const token = await getCsrfToken();
      const formData = new FormData();

      formData.append("avatar", data.avatar ?? "");

      updateAvatar(
        { data: formData, token, id: user?.id ?? "" },
        {
          onSuccess: () => {
            successToast("Avatar updated successfully");
          },
          onError: (error) => {
            const err = (error as AxiosError<{ message: string }>).response
              ?.data.message;
            errorToast(err ?? "Error updating avatar");
          },
        }
      );
    } catch {
      errorToast("Error updating avatar");
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        form.reset();
        formAvatar.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>

          <DialogDescription>
            here you can update your profile
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...formAvatar}>
          <form onSubmit={formAvatar.handleSubmit(handleUpdateAvatar)}>
            <InputControlled
              name="avatar"
              type="file"
              placeholder="Avatar"
              label="Avatar"
              onChange={(e) => {
                if (e.currentTarget.files && e.currentTarget.files[0]) {
                  formAvatar.setValue("avatar", e.currentTarget.files[0]);
                }
              }}
              onClick={(e) => (e.currentTarget.value = "")}
              value={undefined}
            />
            <ButtonLoading
              type="submit"
              isLoading={isLoadingAvatar}
              className="mt-4"
            >
              Update Avatar
            </ButtonLoading>
          </form>
        </FormProvider>
        <FormProvider {...form}>
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <InputControlled
              name="name"
              type="text"
              placeholder="Name"
              label="Name"
            />
            <InputControlled
              name="lastname"
              type="text"
              placeholder="Lastname"
              label="Lastname"
            />
            <InputControlled
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
            />
            <InputControlled
              name="username"
              type="text"
              placeholder="Username"
              label="Username"
            />
            <InputControlled
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
            />
            <div className="flex gap-x-2 mt-4">
              <ButtonLoading type="submit" isLoading={isLoading}>
                Update Profile
              </ButtonLoading>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
