import { NextRequest } from "next/server";

// respond to GET requests
export const GET = async (req: NextRequest) => {
  // TODO: get real data from database instead of mocking
  return new Response(
    JSON.stringify({
      message: "Hello, World!",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
