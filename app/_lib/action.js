"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  // formData comes automatically coming, when the form fill , all the data will be come here as it is a action of form
  // formData is web API
  const session = await auth();
  // do not use try and catch block in server action because we dont need it and error is caused by the closests error boundary
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  // if we want all the data which belongs to the route to revalidate , we can use builtin revalidatePath(path)
  // all the data below that path will be refetched
  revalidatePath("/account/profile");
}

export async function signInAction() {
  // This is server action we created so as user clicks on form submittion this action will be run
  //and as it is completed we will redirected to /account route
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  // This is server action we created so as user clicks on form submittion this action will be run
  //and as it is completed we will redirected to /account route
  await signOut({ redirectTo: "/" });
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowd to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) AUTHENTICATION
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) AUTHORIZATION
  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowd to update this booking");

  // 3) BUILDING UPDATE DATA
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) MUTATION
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) ERROR HANDLING
  if (error) throw new Error("Booking could not be updated");

  // 6) REVALIDATION: and it should happen before redirecting
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 6) REDIRECTING
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  // 1) AUTHENTICATION
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session?.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") || "").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData?.cabinId}`);

  redirect("/cabins/thankyou");
}
