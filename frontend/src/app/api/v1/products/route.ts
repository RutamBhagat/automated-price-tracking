// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function GET(request: Request) {}

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res = await request.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return Response.json({ res });
}