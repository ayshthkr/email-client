import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";

import Form from "@/app/f/[id]/form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (params.id == "new") {
    const { data } = await supabase.from("profiles").select("email");
    const emails = data
      ?.filter(({ email }) => email != user?.email)
      .map(({ email }) => {
        return {
          value: email,
          label: email.split("@")[0],
        };
      });
    return <Form emails={emails ?? []} prefill={false} />;
  }

  const { data } = await supabase
    .from("emails")
    .select("*")
    .eq("id", params.id)
    .single();

  // return <Form prefill={true}  />;
  if (data == null) return notFound();
  return <DisabledForm email={data} account={user?.email ?? ""} />;
}
function DisabledForm({ email, account }: { email: Email; account: string }) {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={" p-2 rounded-sm"}>
        {email.to_email == account ? (
          <div className={"grid w-full max-w-sm items-center gap-1.5"}>
            <Label htmlFor={""}>From : {email.from_email ?? ""}</Label>
          </div>
        ) : (
          <div className={"grid w-full max-w-sm items-center gap-1.5"}>
            <Label htmlFor={""}>To : {email.to_email ?? ""}</Label>
          </div>
        )}
      </div>
      <div className={"grid w-full max-w-sm items-center gap-1.5 p-2"}>
        <Label htmlFor={""}>Subject: {email.subject ?? ""}</Label>
      </div>
      <div className={"p-2"}>
        <p>{email.body}</p>
      </div>
    </div>
  );
}
