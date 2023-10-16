"use client";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string;
}
const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;
  const {} = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
  });

  const { toast } = useToast();

  const { width, ref } = useResizeDetector();
  return (
    <div className=" w-full bg-white rounded-xl shadow flex flex-col items-center ">
      <div className=" h-14 w-full border-b  border-zinc-200 flex items-center justify-between ">
        <div className=" flex items-center gap-1.5">
          <Button
            variant="ghost"
            aria-label="Previous page"
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
            }}
          >
            <ChevronDown className=" h-4 w-4" />
          </Button>

          <div className=" flex items-center gap-1.5">
            <Input value={currPage} className=" w-12 h-8" />
            <p className=" text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "x"} </span>
            </p>
          </div>

          <Button
            variant="ghost"
            aria-label="Next page"
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
            }}
          >
            <ChevronUp className=" h-4 w-4" />
          </Button>
        </div>
      </div>{" "}
      <div className=" flex-1 w-full max-h-screen">
        <div ref={ref}>
          <Document
            onLoadError={() =>
              toast({
                title: "Error loading PDF",
                description: "Please try again later",
                variant: "destructive",
              })
            }
            loading={
              <div className=" flex justify-center ">
                <Loader2 className=" h-6 w-6 my-24 animate-spin" />
              </div>
            }
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="max-h-full "
          >
            <Page width={width ? width : 1} pageNumber={currPage} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
