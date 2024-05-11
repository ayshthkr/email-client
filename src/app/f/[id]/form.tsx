"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendMail } from "@/app/actions/actions";
import { useFormStatus } from "react-dom";

type Emails = {
  value: string;
  label: string;
};

export default function Form({
  emails,
  prefill,
}: {
  emails: Emails[];
  prefill: boolean;
}) {
  const [value, setValue] = useState("");

  return (
    <form className={"flex flex-col gap-4"} action={sendMail}>
      <div className={"flex items-center justify-between p-2 rounded-sm"}>
        <label htmlFor="to_email">Select recipient: </label>
        <input type="text" hidden={true} name={"to_email"} value={value} />
        <Combobox emails={emails ?? []} value={value} setValue={setValue} />
      </div>
      <div className={"p-2"}>
        <Input name={"subject"} placeholder={"Subject..."} />
      </div>
      <div className={"p-2"}>
        <Textarea name={"body"} placeholder={"Body..."} className={"h-48"} />
      </div>
      <div className={"p-2 w-full"}>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type={"submit"} className={"w-full"} disabled={pending}>
      {pending ? "Sending ..." : "Send"}
    </Button>
  );
}

function Combobox({
  emails,
  value,
  setValue,
}: {
  emails: Emails[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-3/4 justify-between"
        >
          {value
            ? emails.find((email) => email.value === value)?.label
            : "Select recipient..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search recipient..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {emails.map((email) => (
              <CommandItem
                key={email.value}
                value={email.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === email.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {email.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
