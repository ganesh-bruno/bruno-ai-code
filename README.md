# Bruno AI - Node.js API

A simple Node.js API with Express, featuring three endpoints: GET, POST, and POST/:id.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Or manually create `.env` with:
```
PORT=3000
NODE_ENV=development
```

## Running the Server

### Development mode (with nodemon):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### GET /api/data
Retrieve all data.

**Response:**
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": []
}
```

### POST /api/data
Create new data.

**Request Body:**
```json
{
  "name": "Example",
  "value": "123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data created successfully",
  "data": {
    "id": "1234567890",
    "name": "Example",
    "value": "123",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /api/data/:id
Update data by ID.

**Request Body:**
```json
{
  "name": "Updated Example",
  "value": "456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data updated successfully",
  "data": {
    "id": "1234567890",
    "name": "Updated Example",
    "value": "456",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

## Project Structure

```
bruno-ai/
├── server.js          # Main server file with API endpoints
├── package.json       # Project dependencies and scripts
├── nodemon.json       # Nodemon configuration
├── .env              # Environment variables (create from .env.example)
├── .env.example      # Example environment variables
├── .gitignore        # Git ignore file
└── README.md         # This file
```

## Technologies Used

- **Express.js** - Web framework
- **dotenv** - Environment variable management
- **nodemon** - Development server with auto-reload

