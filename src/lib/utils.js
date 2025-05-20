export function generateRooms(randomOccupied = false) {
  const rooms = {};

  for (let floor = 1; floor <= 10; floor++) {
    const floorRooms = [];
    const count = floor === 10 ? 7 : 10;
    for (let i = 1; i <= count; i++) {
      const num = floor === 10 ? 1000 + i : floor * 100 + i;
      floorRooms.push({
        number: num,
        occupied: randomOccupied ? Math.random() < 0.3 : false,
      });
    }
    rooms[floor] = floorRooms;
  }

  return rooms;
}

export function calculateBestBooking(rooms, count) {
  const allRooms = [];

  Object.entries(rooms).forEach(([floor, floorRooms]) => {
    floorRooms.forEach((room, idx) => {
      if (!room.occupied) {
        allRooms.push({ ...room, floor: Number(floor), index: idx });
      }
    });
  });

  const combinations = getCombinations(allRooms, count);
  let best = null;
  let minTime = Infinity;

  for (const combo of combinations) {
    const travelTime = calculateTravelTime(combo);
    if (travelTime < minTime) {
      minTime = travelTime;
      best = combo;
    }
  }

  if (!best) return [rooms, []];

  const updated = { ...rooms };
  for (const room of best) {
    updated[room.floor] = updated[room.floor].map((r) =>
      r.number === room.number ? { ...r, occupied: true } : r
    );
  }

  return [updated, best];
}

function getCombinations(arr, k) {
  const result = [];

  function backtrack(start, curr) {
    if (curr.length === k) {
      result.push([...curr]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      curr.push(arr[i]);
      backtrack(i + 1, curr);
      curr.pop();
    }
  }

  backtrack(0, []);
  return result;
}

function calculateTravelTime(rooms) {
  if (rooms.length <= 1) return 0;

  const sorted = rooms.slice().sort((a, b) =>
    a.floor === b.floor ? a.index - b.index : a.floor - b.floor
  );
  const start = sorted[0];
  const end = sorted[sorted.length - 1];

  const vertical = Math.abs(end.floor - start.floor) * 2;
  const horizontal = (start.floor === end.floor)
    ? Math.abs(end.index - start.index)
    : start.index + end.index; // From lift to room on each floor

  return vertical + horizontal;
}

