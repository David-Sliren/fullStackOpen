import React from "react";
import { InterateButton } from "../components/ui/InterateButton";
import { Link } from "react-router";
import { NotFound } from "../components/NotFound";

export const NotFoundPage = () => {
  return (
    <div className="container h-screen w-screen flex justify-center items-center">
      <NotFound />
    </div>
  );
};
