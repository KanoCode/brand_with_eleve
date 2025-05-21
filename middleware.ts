import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function fetchToken(): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.AMROD_SERVER_URL}/VendorLogin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: process.env.AMROD_USERNAME,
          Password: process.env.AMROD_PASSWORD,
          CustomerCode: process.env.AMROD_CUSTOMER_CODER,
        }),

        next: { revalidate: 3000 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }
    const data = await response.json();

    return data.token;
  } catch (error) {
    throw new Error("Failed to fetch token");
  }
}

export async function middleware(request: NextRequest) {
  try {
    const requestHeaders = new Headers(request.headers);

    // const amrodToken = await fetchToken();

    let url = request.nextUrl.pathname;

    // requestHeaders.set("authorization", amrodToken ?? "");
    requestHeaders.set("x-pathname", url);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error(error, "this");
    throw new Error("Something Went Wrong");
  }
}

// This matcher only runs the middleware when hitting any route in the api folder
export const config = {
  matcher: [
    "/api/amrod/:path*",
    "/api/services/scheduler/getData",
    "/shop/product/:path*",
    "/shop/category/:path*",
    "/shop/categories/:path*",
    "/",
  ],
};
