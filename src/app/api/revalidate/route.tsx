import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { path } = await req.json();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/_next/static/${path}`, {
      method: "PURGE",
    });

    return NextResponse.json(
      { message: `Revalidated ${path}` },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("Error revalidating:", err);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
};
