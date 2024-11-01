import RoomCard from "@/components/room-card";
import Heading from "@/components/heading";
import prisma from "@/data/prisma";

export default async function Home() {
  const rooms = await prisma.home.findMany()
  return (
    <div className="p-4 md:p-0  ">
      < Heading title="Available Rooms"/>
     {
      rooms.map((room,index)=>(
        <RoomCard {...room} index={index}  key={room.id}/>
      ))
     }
    </div>
  );
}