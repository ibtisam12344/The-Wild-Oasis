// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // as middleware run for each route , so it will create an infinite loop and shows an error to stop this we
//   // MATCHER is introduced
//   // NextResponse.redirect(new URL("/about", current Url))
//   // every single route will going to redirect to /about so we mention in the that middleware apply only at specificc cnofig that we mention
//   return NextResponse.redirect(new URL("/about", request.url));
// }

// AUTH MIDDLEWARE

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

// MATCHER: here in we tell the only route where middleware should apply ,  matcher: ['route'],
export const config = {
  matcher: ["/account"],
};
