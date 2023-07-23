import { NextResponse } from "next/server";

export function middleware(request) {
  // const item = localStorage.getItem("user");
  // console.log(item);
  // if(!item){
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }
  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/test'],
};