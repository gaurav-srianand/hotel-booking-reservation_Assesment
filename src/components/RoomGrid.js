import Room from "./Room";

export default function RoomGrid({ rooms, bookedRooms }) {
  return (
    <div className="space-y-4">
      {Object.entries(rooms).map(([floor, floorRooms]) => (
        <div key={floor}>
          <h2 className="font-semibold text-lg">Floor {floor}</h2>
          <div className="grid grid-cols-12 gap-1">
            {floorRooms.map((room) => (
              <Room
                key={room.number}
                room={room}
                isBooked={bookedRooms.some((br) => br.number === room.number)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
