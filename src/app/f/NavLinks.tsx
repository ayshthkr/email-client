"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Inbox, Send } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";
import { User } from "@supabase/auth-js";

export default function NavLinks({
  emails,
  user,
}: {
  emails: Email[];
  user: User;
}) {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {emails.map((email) => {
        return (
          <Link href={`/f/${email.id}`} className={"w-full"} key={email.id}>
            <Button
              className={"flex md:flex-col w-full justify-center p-4 h-fit"}
              variant={
                segment != null && segment == `${email.id}`
                  ? "secondary"
                  : "outline"
              }
            >
              <div>
                {email.from_email == user?.email ? <Send /> : <Inbox />}
              </div>
              <div className="flex flex-col p-2">
                <p>
                  {email.from_email == user?.email
                    ? `To : ${email.to_email}`
                    : `From : ${email.from_email}`}
                </p>
                <p>{email.subject}</p>
              </div>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
