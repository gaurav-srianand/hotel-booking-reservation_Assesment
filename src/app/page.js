"use client";
import { useState } from "react";
import RoomGrid from "@/components/RoomGrid";
import Controls from "@/components/Controls";
import { generateRooms, calculateBestBooking } from "@/lib/utils";

export default function Home() {
  const [rooms, setRooms] = useState(generateRooms());
  const [bookedRooms, setBookedRooms] = useState([]);
  const [numRooms, setNumRooms] = useState(1);

  const handleBook = () => {
    const [updatedRooms, selected] = calculateBestBooking(rooms, numRooms);
    setRooms(updatedRooms);
    setBookedRooms(selected);
  };

  const handleRandomize = () => {
    const randomized = generateRooms(true);
    setRooms(randomized);
    setBookedRooms([]);
  };

  const handleReset = () => {
    setRooms(generateRooms());
    setBookedRooms([]);
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hotel Room Reservation System</h1>
      <Controls
        numRooms={numRooms}
        setNumRooms={setNumRooms}
        handleBook={handleBook}
        handleRandomize={handleRandomize}
        handleReset={handleReset}
      />
      <RoomGrid rooms={rooms} bookedRooms={bookedRooms} />
    </main>
  );
}
