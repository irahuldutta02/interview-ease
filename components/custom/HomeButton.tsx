"use client";

import { House } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default function HomeButton() {
  return (
    <>
      <Button
        onClick={() => {
          redirect("/");
        }}
        variant="outline"
        size="icon"
      >
        <House className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </>
  );
}
