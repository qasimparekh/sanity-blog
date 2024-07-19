//? route handler enabling draft mode feature in NextJS. Can be authenticated by requiring token & comparing user role

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  draftMode().enable();

  const { origin } = new URL(request.url);

  redirect(origin);
}
