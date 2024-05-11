"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { signInWithGithub } from "@/app/actions/actions";
import { GithubIcon } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      formAction={signInWithGithub}
      className="rounded-md px-4 py-2 mb-2 flex gap-2 justify-center"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        "Signing In"
      ) : (
        <>
          Sign In with Github <GithubIcon />
        </>
      )}
    </Button>
  );
}

export default SubmitButton;
