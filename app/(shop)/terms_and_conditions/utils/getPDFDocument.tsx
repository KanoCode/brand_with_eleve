const getPDFDocument = async (path: string) => {
  const PDFJS = await import("pdfjs-dist");
  PDFJS.GlobalWorkerOptions.workerSrc =
    window.location.origin + "/pdf.worker.min.mjs";

  return new Promise((resolve, reject) => {
    PDFJS.getDocument(path)
      .promise.then((document: any) => {
        resolve(document);
      })
      .catch(reject);
  });
};

export default getPDFDocument;
