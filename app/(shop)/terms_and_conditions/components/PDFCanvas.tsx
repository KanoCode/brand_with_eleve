"use client";
import React from "react";
import { useEffect, useRef } from "react";
import getPDFDocument from "../utils/getPDFDocument";
import createPDFPage from "../utils/createPDFPage";
import renderPDFToCanvas from "../utils/renderPDFToCanvas";
import { storage } from "@/app/firebase/config";
import { ref as refFs, getDownloadURL } from "firebase/storage";

export const PDFCanvas = () => {
  const pathReference = refFs(storage, "images/markethub_ts_and_cs");


  const ref = useRef<HTMLDivElement>(null);

  const getPDFURL = async () => {
    let url = await getDownloadURL(pathReference);
    return url;
  };

  const renderPDF = async () => {
    // PDF Path or URL
    const url1 = window.location.origin + "/dummy.pdf";

    const url = await getPDFURL();


    // Page number you want to render
    const pageNumber = 1;

    // const loadingTask = pdfjsLib.getDocument(file);

    // Fetch the PDF
    const pdfDocument: any = await getPDFDocument(url);

    // Get the PDF page
    const pdfPage = await createPDFPage(pdfDocument, pageNumber);

    // Get the viewport of the page to extract sizes
    const viewport = pdfPage.getViewport({ scale: 1 });
    const { height, width } = viewport;
    console.log("viewport Width: ", width, "viewport Height: ", height);

    // Create the canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Render the pdf to canvas
    const pdfCanvas = await renderPDFToCanvas(pdfPage, canvas);

    // then add the canvas with pdf to the div element
    ref.current?.replaceChildren(pdfCanvas);
  };

  useEffect(() => {
    renderPDF();

    // const pdfjs = window.pdfjsLib as typeof
  }, []);

  return <div className="mx-auto" ref={ref}></div>;
};
