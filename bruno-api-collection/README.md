# Bruno API Collection

This Bruno collection contains API requests for testing the Node.js API server.

## Collection Structure

```
bruno-api-collection/
├── bruno.json              # Collection metadata
├── collection.bru          # Collection configuration
├── environments/           # Environment variables
│   ├── local.bru          # Local environment
│   └── development.bru    # Development environment
└── api/
    └── data/              # API endpoints
        ├── Get All Data.bru
        ├── Create Data.bru
        ├── Update Data by ID.bru
        ├── Update Data - Not Found.bru
        └── Create Data - Empty Body.bru
```

## How to Use

1. **Open in Bruno**: Open the `bruno-api-collection` folder in Bruno API Client
2. **Select Environment**: Choose either `local` or `development` environment
3. **Run Requests**: Execute the requests in order for best results:
   - First: `Get All Data` - to see current data
   - Second: `Create Data` - to create a new item (stores ID for next request)
   - Third: `Update Data by ID` - to update the created item
   - Additional: Test edge cases with the other requests

## API Endpoints

### GET /api/data
Retrieves all data from the server.

**Tests:**
- Status code is 200
- Response has success, message, and data properties
- Data is an array
- Response time is acceptable

### POST /api/data
Creates a new data item.

**Tests:**
- Status code is 201
- Response has success, message, and data properties
- Created item has id and createdAt
- Stores the created ID in `lastCreatedId` variable for chaining

### POST /api/data/:id
Updates an existing data item by ID.

**Tests:**
- Status code is 200
- Response has success, message, and data properties
- Updated item has id and updatedAt
- ID is preserved after update

### POST /api/data/:id (Not Found)
Tests error handling for non-existent IDs.

**Tests:**
- Status code is 404
- Response has success: false
- Error message is present

### POST /api/data (Empty Body)
Tests creating data with empty body.

**Tests:**
- Status code is 201
- Item is created with only id and createdAt

## Environment Variables

Both environments (`local` and `development`) are configured with:
- `baseUrl`: http://localhost:3000
- `apiVersion`: v1
- `timeout`: 5000

You can modify these values in the environment files to match your server configuration.

## Request Chaining

The collection uses Bruno's variable system to chain requests:
1. `Create Data` stores the created item's ID in `lastCreatedId`
2. `Update Data by ID` uses `lastCreatedId` to update the item

This allows you to test a complete workflow: create → update.

## Running Tests

All requests include comprehensive test cases that validate:
- HTTP status codes
- Response structure
- Data integrity
- Response times
- Error handling

Tests run automatically after each request in Bruno.

