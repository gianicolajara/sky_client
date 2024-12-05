"use client";

import InputControlled from "@/components/shared/InputControlled";
import TextAreaControlled from "@/components/shared/TextAreaControlled";
import { CreatePostType } from "@/schemas/post";
import { UseFormReturn } from "react-hook-form";

type Props = {
  formUtility: UseFormReturn<CreatePostType, unknown, undefined>;
};

const CreatePostForm = ({ formUtility }: Props) => {
  return (
    <>
      <InputControlled name="title" type="text" placeholder="Title" />
      <TextAreaControlled name="content" placeholder="Content" />
      <InputControlled
        name="postMedia"
        placeholder="Files"
        type="file"
        multiple={true}
        onChange={(e) =>
          formUtility.setValue("postMedia", e.target.files as FileList)
        }
        onClick={(e) => (e.currentTarget.value = "")}
        value={undefined}
      />
    </>
  );
};

export default CreatePostForm;
