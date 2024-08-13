import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavbarPage = () => {
  const params = useParams<{ id: string }>();
  const link = `/addstudent/${params.id}`;
  return (
    <div>
      <div className="pr-7 sticky border-b bg-background top-0 w-screen h-16 place-content-center grid grid-cols-3 justify-center ">
        <div className="space col-span-2 "></div>
        <div className="butn col-span-1 flex justify-center ">
          <div className="text-white mx-2  w-fit">
            <Button variant="outline">
              <Link href="/studentlist">Students</Link>
            </Button>
          </div>
          <div className="text-white  mx-2 w-fit">
            <Button variant="outline">
              <Link href={link}>Add Student</Link>
            </Button>
          </div>
          <div className="text-white mx-2 w-fit">
            <Button variant="link">Logout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPage;
