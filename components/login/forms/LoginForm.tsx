"use client";

import InputControlled from "@/components/shared/InputControlled";

const LoginForm = () => {
  return (
    <>
      <InputControlled
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
      />
      <InputControlled
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
      />
    </>
  );
};

export default LoginForm;
