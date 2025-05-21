import { defaultHead } from "next/head";

function ProductNotFound() {
  return (
    <>
      <div className="min-h-[60vh] flex flex-grow items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-3 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="">
            Oops! The page you are looking for could not be found.
          </p>
          <a
            href="/"
            className="mt-4 inline-block rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            {" "}
            Go back to Home{" "}
          </a>
        </div>
      </div>
    </>
  );
}

export default ProductNotFound;
