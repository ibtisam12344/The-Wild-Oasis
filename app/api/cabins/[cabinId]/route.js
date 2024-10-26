import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

//let alone API endpoint we have here server action that we use like below

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
// export async function POST(request, { params })
// export async function DELETE(request, { params })
// export async function PUT(request, { params })
// export async function PATCH(request, { params })
