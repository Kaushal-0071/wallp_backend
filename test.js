// anotherFile.js
const { getCreatorsAndColors,connectToDatabase } = require("./app");

async function doSomething() {
  try {
    await connectToDatabase();
    const { creators, colors } = await getCreatorsAndColors();
   
console.log(colors.map(color => `"${color}"`).join(', '));



    // …do whatever you need with them…
  } catch (err) {
    console.error("Error fetching filters:", err);
  }
}

doSomething();
