export default function Controls({ numRooms, setNumRooms, handleBook, handleRandomize, handleReset }) {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <input
        type="number"
        min="1"
        max="5"
        value={numRooms}
        onChange={(e) => setNumRooms(Number(e.target.value))}
        className="border rounded px-2 py-1 w-20"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleBook}>
        Book Rooms
      </button>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleRandomize}>
        Randomize Occupancy
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleReset}>
        Reset Booking
      </button>
    </div>
  );
}
