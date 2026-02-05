require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store (for demonstration)
let dataStore = [];

// GET endpoint
app.get('/api/data', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: dataStore
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving data',
      error: error.message
    });
  }
});

// POST endpoint
app.post('/api/data', (req, res) => {
  try {
    const newItem = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    dataStore.push(newItem);
    
    res.status(201).json({
      success: true,
      message: 'Data created successfully',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating data',
      error: error.message
    });
  }
});

// POST endpoint with :id parameter
app.post('/api/data/:id', (req, res) => {
  try {
    const { id } = req.params;
    const itemIndex = dataStore.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    const updatedItem = {
      ...dataStore[itemIndex],
      ...req.body,
      id: id, // Preserve the original id
      updatedAt: new Date().toISOString()
    };
    
    dataStore[itemIndex] = updatedItem;
    
    res.status(200).json({
      success: true,
      message: 'Data updated successfully',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating data',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    endpoints: {
      'GET /api/data': 'Retrieve all data',
      'POST /api/data': 'Create new data',
      'POST /api/data/:id': 'Update data by ID'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

