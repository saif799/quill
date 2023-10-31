"use client";

import Messages from "./Messages";
import ChatInputs from "./ChatInputs";
import { trpc } from "@/app/_trpc/client";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
interface chatWrapperProps {
  fileId: string;
}
const ChatWrapper = ({ fileId }: chatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  if (isLoading)
    return (
      <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className=" flex flex-1 justify-center items-center flex-col mb-28 ">
          <div className=" left-px flex-col items-center gap-2">
            <Loader2 className=" h-8 w-8 text-blue-500 animate-spin" />
            <h3 className=" font-semibold text-xl"> Loading...</h3>
            <p className=" text-zinc-500 text-sm">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInputs isDisabled />
      </div>
    );

  if (data?.status === "PROCCESSING")
    return (
      <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className=" flex flex-1 justify-center items-center flex-col mb-28 ">
          <div className=" left-px flex-col items-center gap-2">
            <Loader2 className=" h-8 w-8 text-blue-500 animate-spin" />
            <h3 className=" font-semibold text-xl"> Processing...</h3>
            <p className=" text-zinc-500 text-sm">This Won&apos;t take time.</p>
          </div>
        </div>

        <ChatInputs isDisabled />
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className=" flex flex-1 justify-center items-center flex-col mb-28 ">
          <div className=" left-px flex-col items-center gap-2">
            <XCircle className=" h-8 w-8 text-red-500" />
            <h3 className=" font-semibold text-xl"> Too many pages in PDF</h3>
            <p className=" text-zinc-500 text-sm">
              Your <span className=" font-medium">Free</span> plan supports up
              to 4MB per PDF
            </p>

            <Link
              href="/"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className=" h-3 w-3  mr-1.5" /> Back{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  return (
    <div className=" relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className=" flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>

      <ChatInputs />
    </div>
  );
};

export default ChatWrapper;
