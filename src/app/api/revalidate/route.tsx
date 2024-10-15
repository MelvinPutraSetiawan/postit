import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Revalidating page...");

  try {
    const { path } = await req.json();

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const revalidateUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/revalidate?path=${path}`;
    const revalidateResponse = await fetch(revalidateUrl, { method: "GET" });

    if (!revalidateResponse.ok) {
      throw new Error(
        `Failed to revalidate: ${await revalidateResponse.text()}`
      );
    }

    console.log(`Successfully revalidated ${path}`);
    return NextResponse.json({ message: `Revalidated ${path}` });
  } catch (err) {
    console.error("Error revalidating:", err);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}
