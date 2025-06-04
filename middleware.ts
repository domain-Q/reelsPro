import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // allow auth related url
        if (
          pathname.startsWith("/auth") ||
          pathname === "/login" ||
          pathname === "register" ||
          pathname === "/" ||
          pathname.startsWith("/api/videos")
        ) {
          return true;
        } else {
          return !!token;
        }
      },
    },
  }
);

export const config={
    matcher:[
        "/((?!_!next/static|_next/image\favicon.ico|public/).*) "
    ]
}
