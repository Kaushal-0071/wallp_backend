// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const ITEMS_TOTAL = 111;
const items = [];

for (let i = 1; i <= ITEMS_TOTAL; i++) {
  items.push({
    id: `item-${i}`,
    creator: 'Nathaniel',
    profileLink: 'https://github.com/Nathaniel-Dev',
    imageLink: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 4500,
    height: 3000,
  });
}


app.get('/searchImages', (req, res) => {
  console.log(req.query || 'No query parameters');
  // Parse query parameters
  const pageRaw = parseInt(req.query.page, 10) || 1;
  const perPageRaw = parseInt(req.query.perPage, 10) || 10;

  // Enforce a minimum of 1
  const page = pageRaw < 1 ? 1 : pageRaw;
  const perPage = perPageRaw < 1 ? 10 : perPageRaw;

  const total = ITEMS_TOTAL;
  const totalPages = Math.ceil(total / perPage);

  // Compute slice indices
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  // If startIndex ≥ total, return an empty array
  let pageItems = [];
  if (startIndex < total) {
    pageItems = items.slice(startIndex, endIndex);
  }
console.log(pageItems);
  // Return JSON in the shape your Kotlin PagingSource expects
  res.json(
     pageItems
    // total: total,
    // total_page: totalPages,
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
