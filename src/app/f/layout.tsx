import { PropsWithChildren } from "react";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/actions";
import LogoutButton from "@/app/f/LogoutButton";
import Link from "next/link";
import { ArrowDownCircleIcon, Inbox, Send } from "lucide-react";
import NavLinks from "@/app/f/NavLinks";

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const { data } = await supabase
    .from("emails")
    .select("*")
    .order("id", { ascending: false });
  return (
    <div className={"block md:flex w-full min-h-screen"}>
      <div className={"w-full md:w-[30vw] flex flex-col gap-3 p-2 border"}>
        <Link href={"/f/new"}>
          <Button className={"w-full"}>New</Button>
        </Link>
        <form action={signOut}>
          <LogoutButton from={user?.email ?? ""} />
        </form>
        {!data || !data.length ? (
          "No emails send. Use send button"
        ) : (
          <NavLinks emails={data} user={user} />
        )}
      </div>
      <div className={"w-full p-2"}>{children}</div>
    </div>
  );
}
