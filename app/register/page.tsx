"use client";

import ButtonLoading from "@/components/shared/Button/ButtonLoading";
import InputControlled from "@/components/shared/InputControlled";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCsrf from "@/hooks/useCsrf";
import useRegister from "@/hooks/useRegister";
import useToast from "@/hooks/useToast";
import { registerSchema, RegisterSchemaType } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "nextjs-toploader/app";
import { FormProvider, useForm } from "react-hook-form";

const RegisterPage = () => {
  const router = useRouter();

  const { error: errorToast, success: successToast } = useToast();

  const {
    getCsrfToken: { mutateAsync: getCsrfToken, isPending: isCsrfPending },
  } = useCsrf();
  const {
    registerMutation: { mutate: register, isPending: isRegisterPending },
  } = useRegister();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: RegisterSchemaType) => {
    try {
      const token = await getCsrfToken();
      register(
        { data: data, csrfToken: token },
        {
          onSuccess: () => {
            successToast("User created successfully");
            router.push("/login");
          },
          onError: (error) => {
            const err = (error as AxiosError<{ message: string }>).response
              ?.data.message;
            errorToast(err ?? "Error creating user");
          },
        }
      );
    } catch {
      errorToast("Error creating user");
    }
  };

  return (
    <section>
      <div className="h-screen max-w-[1200px] mx-auto px-2 py-4">
        <div className="w-full h-full flex justify-center items-center">
          <Card className="w-full h-max">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form
                  className="flex flex-col gap-y-2"
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
                  <div className="flex gap-x-2 mt-2">
                    <ButtonLoading
                      type="submit"
                      isLoading={isRegisterPending || isCsrfPending}
                    >
                      Sign Up
                    </ButtonLoading>
                    <Button onClick={() => router.push("/login")}>
                      Go to Login
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
