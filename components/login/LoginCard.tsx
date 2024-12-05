"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCsrf from "@/hooks/useCsrf";
import useLogin from "@/hooks/useLogin";
import { LoginSchema, LoginSchemaType } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "nextjs-toploader/app";
import { FormProvider, useForm } from "react-hook-form";
import Anchor from "../shared/Anchor";
import ButtonLoading from "../shared/Button/ButtonLoading";
import LoginForm from "./forms/LoginForm";

const LoginCard = () => {
  const router = useRouter();

  const {
    getCsrfToken: { mutateAsync: getCsrfToken },
  } = useCsrf();

  const {
    loginMutation: { mutate: loginMutate, isPending: isLoginPending },
  } = useLogin();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: LoginSchemaType) => {
    const { email, password } = data;

    const token = await getCsrfToken();
    loginMutate(
      { email, password, token },
      {
        onSuccess: () => {
          form.reset();
          router.push("/home");
        },
      }
    );
  };

  return (
    <Card className="max-w-96 h-max w-full shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle>Login Sky</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full">
        <FormProvider {...form}>
          <form
            className="w-full h-full flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(submit)}
          >
            <LoginForm />
            <ButtonLoading type="submit" isLoading={isLoginPending}>
              Login
            </ButtonLoading>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <Anchor href="/register">Don&apos;t have an account</Anchor>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
