
import { NextResponse } from 'next/server'

import { headers } from 'next/headers';
import { auth } from './app/lib/auth';
import { url } from 'better-auth';


export async function proxy(request) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });


  const userRole = session?.user?.role;
  
    if (!session?.user) {
  
    return NextResponse.redirect(new URL("/login",request.url))
    }

  if(!userRole =="tenant"){
    return NextResponse.redirect(new URL("/login",request.url))

  }
   if(!userRole =="admin"){
    return NextResponse.redirect(new URL("/login",request.url))

  }

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

 

  return NextResponse.next();
}

export const config = {
  matcher: ['/allproperties',"/allproperties/:id","/dashboard/tenant","/dashboard/admin"],
}