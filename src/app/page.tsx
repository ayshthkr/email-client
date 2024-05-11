/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aQCKmftdxNo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  CalendarIcon,
  InboxIcon,
  PaperclipIcon,
  SearchIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";

export default function Page() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Effortless Email Management
            </h1>
            <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
              Streamline your inbox with our powerful email client. Organize,
              respond, and collaborate with ease.
            </p>
            <Link href={"/login"}>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-start gap-3">
              <InboxIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-bold">Organized Inbox</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Easily sort and filter your emails to keep your inbox
                clutter-free.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <CalendarIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-bold">Calendar Integration</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Sync your email events with your calendar to stay on top of your
                schedule.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <PaperclipIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-bold">Powerful Attachments</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Easily manage and share files with your team directly from your
                inbox.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-start gap-3">
              <SearchIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-bold">Powerful Search</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Quickly find any email, attachment, or contact with our advanced
                search capabilities.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-bold">Collaborative Features</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Share emails, assign tasks, and work together with your team
                seamlessly.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <ShieldIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-bold">Secure & Private</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Rest easy knowing your data is protected with our
                industry-leading security measures.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join the Email Revolution
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
              Sign up today and experience the future of email management.
            </p>
            <div className="w-full max-w-md mx-auto space-y-2">
              <Link href={"/login"}>
                <Button className="w-full" type="submit">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
