"use server";
import { NextResponse } from "next/server";
import { UserId } from "./get-userId";
import prisma from "@/data/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";
import bcrypt from "bcrypt";

export const handleDeleteHall = async (formData: FormData) => {
  const hallId = formData.get("id") as string;
  try {
    const userId = UserId();
    const deletedHall = await prisma.home.delete({
      where: {
        id: Number(hallId),
        user_id: Number(userId?.id),
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "you can not delete this post" }),
      { status: 500 }
    );
  }
};

export const handleBooking = async (formData: FormData) => {
  try {
    const formDataObject = Object.fromEntries(formData.entries());
    if (!Number(formDataObject["id"])) {
      return { message: "select a room" };
    }
    const checkInDateStr = `${formDataObject["check-in-date"]}T${formDataObject["check-in-time"]}`;
    const checkOutDateStr = `${formDataObject["check-out-date"]}T${formDataObject["check-out-time"]}`;
    if (
      !formDataObject["check-in-date"] ||
      !formDataObject["check-in-time"] ||
      !formDataObject["check-out-date"] ||
      !formDataObject["check-out-time"]
    ) {
      throw new Error("Missing date or time input.");
    }
    const checkInDate = new Date(checkInDateStr);
    const checkOutDate = new Date(checkOutDateStr);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      console.error("Invalid check-in or check-out date/time format.", {
        checkInDateStr,
        checkOutDateStr,
      });
      throw new Error("Invalid check-in or check-out date/time.");
    }
    if (checkInDate >= checkOutDate) {
      throw new Error("Check-in date must be before check-out date.");
    }
    const userId = UserId();
    if (!userId?.id) {
      return { message: "User ID not found." };
    }
    const existingBooking = await prisma.bookings.findFirst({
      where: {
        homeId: Number(formDataObject["id"]),
        OR: [
          {
            check_in: { lte: checkOutDate },
            check_out: { gte: checkInDate },
          },
        ],
      },
    });

    if (existingBooking) {
      return {
        message: "This booking time conflicts with an existing reservation.",
      };
    }
    await prisma.bookings.create({
      data: {
        check_in: checkInDate.toISOString(),
        check_out: checkOutDate.toISOString(),
        homeId: Number(formDataObject["id"]),
        user_id: Number(userId.id),
      },
    });

    revalidatePath("/booking");
    return {
      message: "booked",
    };
  } catch (error) {
    console.error("Error during booking:", error);
    return {
      message: "unable to book room",
    };
  }
};

const toUtcDateTime = (dateString: Date) => {
  return DateTime.fromISO(String(dateString), { zone: "utc" }).toUTC();
};
const checkRoomAvailable = (
  checkInA: any,
  checkOutA: any,
  checkInB: any,
  checkOutB: any
) => {
  return checkInA < checkOutB && checkOutA > checkInB;
};

export const checkRoomAvailability = async (
  homeId: number,
  check_in: Date,
  check_out: Date
) => {
  try {
    const checkInDateTime = toUtcDateTime(check_in);
    const checkOutDateTime = toUtcDateTime(check_out);
    const roomBooking = await prisma.bookings.findMany({
      where: {
        homeId: 2,
      },
    });
    for (const booking of roomBooking) {
      const bookingCheckInDateTime = toUtcDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUtcDateTime(booking.check_out);
      if (
        checkRoomAvailable(
          checkInDateTime,
          checkOutDateTime,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};
export const deleteBooking = async (formData: FormData) => {
  try {
    const id = formData.get("id");
    const user_id = formData.get("user_id");
    const userId = UserId();
    if (Number(user_id) !== Number(userId?.id)) {
      return { message: "you are not authorise" };
    }

    if (!userId?.id) {
      throw new Error("User ID not found.");
    }

    await prisma.bookings.delete({
      where: {
        id: Number(id),
        user_id: Number(userId?.id),
      },
    });
    revalidatePath("/booking");
  } catch (error) {
    console.log(error);
    return { message: "can not cancel booking" };
  }
};

export const ChangeUserPassword = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const decodedEmail = decodeURIComponent(email);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    if (email) {
      await prisma.user.update({
        where: {
          email: decodedEmail,
        },
        data: {
          password: hash,
        },
      });
      return { message: "password updated" };
    } else {
      return { message: "can not update user password " };
    }
  } catch (error) {
    console.log(error);
    return { message: "can not update user password " };
  }
};
