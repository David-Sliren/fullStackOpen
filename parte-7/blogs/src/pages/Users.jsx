import React from "react";
import { useGetUsers } from "../hooks/useGetData";
import { User } from "../components/User";
import { Loader } from "../components/ui/Loader";
import { NotFound } from "../components/NotFound";

export const Users = () => {
  const { data, isLoading, isError } = useGetUsers();

  if (isError) return <NotFound />;

  if (isLoading) return <Loader />;
  return (
    <section className="space-y-2 px-2 text-white">
      <h1 className="text-5xl font-bold mb-4">Users</h1>
      {data.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </section>
  );
};
