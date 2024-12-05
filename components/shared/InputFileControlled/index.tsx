"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  label?: string;
  description?: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputFileControlled = ({ label, description, name, ...rest }: Props) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type="file"
              {...field}
              {...rest}
              onChange={(e) => {
                field.onChange(e.target.files);
              }}
              multiple={true}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFileControlled;
