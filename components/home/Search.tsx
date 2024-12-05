"use client";

import useGetUserIdByUsername from "@/hooks/useUser/useGetUserIdByUsername";
import debounce from "debounce-promise";
import { useRouter } from "next/navigation";
import AsyncSelect from "react-select/async";

const SearchHome = () => {
  const router = useRouter();

  const {
    getUserIdByUsername: { mutateAsync: getUserIdByUsername },
  } = useGetUserIdByUsername();

  const handleSearchUsers = async (inputValue: string) => {
    let users: {
      value: string;
      label: string;
    }[] = [];

    if (inputValue) {
      const res = await getUserIdByUsername(inputValue);

      users = res?.map((user) => ({
        value: user.id,
        label: `${user.username}`,
      }));
    }
    return users;
  };

  const dobounceHandleSearchUsers = debounce(handleSearchUsers, 500);

  return (
    <div>
      <AsyncSelect
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        cacheOptions
        defaultOptions
        loadOptions={dobounceHandleSearchUsers}
        onChange={(value) => router.push(`/profile/${value?.value}`)}
        placeholder="Search user"
      />
    </div>
  );
};

export default SearchHome;
