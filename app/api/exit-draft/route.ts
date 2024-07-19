import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  draftMode().disable();

  const { origin } = new URL(request.url);

  redirect(origin);
}
