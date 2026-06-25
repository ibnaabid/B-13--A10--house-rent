
import { NextResponse } from 'next/server'

import { headers } from 'next/headers';
import { auth } from './app/lib/auth';



export async function proxy(request) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

const user = session?.user;
  const userRole = user?.role;
  const { pathname } = request.nextUrl;

  // ১. ইউজার লগইন করা না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট করুন
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ২. ইউআরএল পাথ (Pathname) অনুযায়ী রোল চেক করুন
  
  // Tenant ড্যাশবোর্ড প্রটেকশন
  if (pathname.startsWith("/dashboard/tenant") && userRole !== "tenant") {
    return NextResponse.redirect(new URL("/login", request.url)); // অনধিকার প্রবেশ হলে হোমে পাঠান
  }

  // Admin ড্যাশবোর্ড প্রটেকশন
  if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Owner ড্যাশবোর্ড প্রটেকশন
  if (pathname.startsWith("/dashboard/owner") && userRole !== "owner") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/allproperties',"/allproperties/:id","/dashboard/tenant","/dashboard/admin"],
}