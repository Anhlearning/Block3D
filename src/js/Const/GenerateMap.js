import fs from "fs";

function generatePatterns(count = 100) {
  const patterns = [];
  for (let i = 0; i < count; i++) {
    patterns.push(generateArray(6, 2, 4));
  }
  return patterns;
}

function generateArray(length, minObjects = 2, maxObjects = 4) {
  let result = [];
  let valid = false;

  while (!valid) {
    result = [];
    for (let i = 0; i < length; i++) {
      result.push(randomWithWeight());
    }

    // đếm số object khác -1
    const objectCount = result.filter(x => x !== -1).length;

    // kiểm tra không vượt quá số lần cho phép
    let typeValid = true;
    const counts = {};
    for (const val of result) {
      if (val !== -1) {
        counts[val] = (counts[val] || 0) + 1;
        if (counts[val] > 3) {   // giới hạn max 3 lần
          typeValid = false;
          break;
        }
      }
    }

    valid = objectCount >= minObjects && objectCount <= maxObjects && typeValid;
  }

  return result;
}

const spawnWeights = [
  { type: 0, weight: 19 },
  { type: 1, weight: 19 },
  { type: 2, weight: 19 },
  { type: 3, weight: 19 },
  { type: 4, weight: 19 },
  { type: -1, weight: 5 },
  // thêm tùy ý
];

function randomWithWeight() {
  const totalWeight = spawnWeights.reduce((sum, item) => sum + item.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const item of spawnWeights) {
    if (rand < item.weight) return item.type;
    rand -= item.weight;
  }
}

const patterns = generatePatterns(100);

// Lưu ra file JSON
fs.writeFileSync("patterns.json", JSON.stringify(patterns, null, 2));
console.log("✅ Saved patterns.json");
