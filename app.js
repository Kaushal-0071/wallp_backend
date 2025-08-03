const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');


const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


let db, collection;

async function getCreatorsAndColors() {
  if (!collection) {
    throw new Error("Must call connectToDatabase() before getCreatorsAndColors()");
  }
  const creators = await collection.distinct("creator");
  const colors   = await collection.distinct("dominant_colors");
  return { creators, colors };
}

async function connectToDatabase() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DB_NAME);
        collection = db.collection(COLLECTION_NAME);
        
        // Create text index for searchable fields
        try {
            await collection.createIndex({
                'name': 'text',
                'dominant_colors': 'text',
                'creator_url': 'text',
                'creator': 'text'
            });
            console.log('Text index created successfully');
        } catch (error) {
            console.log('Index already exists or error creating index:', error.message);
        }
        
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

// Route 1: Fetch all images
app.get('/api/images', async (req, res) => {
    console.log(req.query || 'No query parameters');
    try {
        // Fetch all images, sorted by newest first
        const images = await collection
            .find({})
            .sort({ created_at: -1 })
            .project({ _id: 0 }) // Exclude MongoDB's _id field
            .toArray();
        
        res.json(
           
           images
        );
        
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch images'
        });
    }
});

// Route 2: Search images with query
app.get('/api/images/search', async (req, res) => {
  try {
    const query = req.query.q?.trim()
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      })
    }

    // Build a case‑insensitive regex once
    const regex = new RegExp(query, 'i')

    // Search filter: any of name, creator, or one of the dominant_colors matches
    const searchFilter = {
      $or: [
        { name:       { $regex: regex } },
        { creator:    { $regex: regex } },
        {               // dominant_colors is an array of strings
          dominant_colors: {
            $elemMatch: { $regex: regex }
          }
        }
      ]
    }

    const images = await collection
      .find(searchFilter)
      .sort({ created_at: -1 })
      .project({ _id: 0 })
      .toArray()

    res.json(images)
  } catch (error) {
    console.error('Error searching images:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to search images'
    })
  }
})

// Start server
async function startServer() {
    await connectToDatabase();
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API Endpoints:`);
        console.log(`- GET /api/images - Fetch all images`);
        console.log(`- GET /api/images/search?q=query - Search images`);
    });
}
module.exports = {
  
  getCreatorsAndColors,
  connectToDatabase
};
startServer().catch(console.error);