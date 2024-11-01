"use client";
import Heading from "@/components/heading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddRoom = () => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCreateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!file) return;
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      formData.set("image", file);
      const res = await fetch(`http://localhost:3000/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        target.reset();
        setLoading(false);
        toast.success("added successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="p-4 md:p-0">
      <div className="w-full">
        <Heading title="Add a Room" />
      </div>
      <form
        action=""
        onSubmit={handleCreateBook}
        className="my-5 grid w-full max-w-6xl shadow p-4 rounded-md gap-y-11"
      >
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            room name
          </label>
          <input
            type="text"
            name="name"
            placeholder="room name"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            description
          </label>
          <textarea
            rows={4}
            name="description"
            placeholder="description"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 resize-none placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            square feet
          </label>
          <input
            type="number"
            min={1}
            name="sqft"
            placeholder="enter room size in ft"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            capacity
          </label>
          <input
            type="number"
            min={1}
            name="capacity"
            placeholder="number of people the room can hold"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            price per hour
          </label>
          <input
            type="number"
            min={1}
            name="price_per_hour"
            placeholder="enter price per hour"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            address
          </label>
          <input
            type="text"
            name="address"
            placeholder="enter full address"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            location
          </label>
          <input
            type="text"
            name="location"
            placeholder="location (building,floor,room)"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label htmlFor="" className="mb-3 capitalize font-semibold text-lg">
            availability
          </label>
          <input
            type="text"
            name="availability"
            placeholder="availability (monday-friday,9am - 5pm)"
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2 placeholder:capitalize placeholder:text-sm"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">
            amenities
          </label>
          <input
            type="text"
            name="amenities"
            placeholder="adipisicing elit. Suscipit, iusto."
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2"
          />
        </div>
        <div className="grid w-full ">
          <label className="mb-3 capitalize font-semibold text-lg">image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
            name="image"
            placeholder="adipisicing elit. Suscipit, iusto."
            className="border border-gray-300 rounded-md shadow-sm outline-none p-2"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="disabled:cursor-not-allowed bg-blue-700 text-white font-bold capitalize cursor-pointer outline-none rounded-sm p-3 my-5"
        >
          save room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
