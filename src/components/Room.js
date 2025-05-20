export default function Room({ room, isBooked }) {
  const bg = room.occupied ? "bg-gray-400" : isBooked ? "bg-green-500" : "bg-white";
  return (
    <div
      className={`border h-12 flex items-center justify-center text-sm rounded ${bg}`}
      title={`Room ${room.number}`}
    >
      {room.number}
    </div>
  );
}
