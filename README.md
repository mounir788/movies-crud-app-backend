# Favorite Media App Backend

A RESTful API backend for managing favorite movies and TV shows built with Node.js, Express, TypeScript, and Prisma.

## Features

- 🎬 CRUD operations for media (movies and TV shows)
- 🔍 Search functionality with pagination
- ✅ Input validation with Zod
- 🗄️ MySQL database with Prisma ORM
- 🚀 TypeScript for type safety
- 📝 Comprehensive error handling
- 🏥 Health check endpoint

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/favorite_media_db"
   NODE_ENV="development"
   PORT=5000
   ```

   Replace `username`, `password`, and `localhost` with your MySQL credentials.

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run database migrations
   npm run migrate:dev

   # Seed the database with sample data
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check

- `GET /health` - Check server status

### Media Management

- `GET /api/media` - Get all media with pagination
- `GET /api/media/:id` - Get media by ID
- `POST /api/media` - Create new media
- `PUT /api/media/:id` - Update media
- `DELETE /api/media/:id` - Delete media

### Query Parameters for GET /api/media

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search in title, director, or location

## Media Schema

```typescript
{
  id: string(UUID);
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Example Requests

### Create Media

```bash
curl -X POST http://localhost:5000/api/media \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Matrix",
    "type": "Movie",
    "director": "Lana Wachowski",
    "budget": "$63M",
    "location": "Sydney, Australia",
    "duration": "136 min",
    "year": "1999"
  }'
```

### Get Media with Search

```bash
curl "http://localhost:5000/api/media?search=Matrix&page=1&limit=5"
```

### Get All Media

```bash
curl "http://localhost:5000/api/media"
```

### Get Media by ID

```bash
curl "http://localhost:5000/api/media/{media-id}"
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio
- `npm run migrate:dev` - Run database migrations
- `npm run migrate:deploy` - Deploy migrations to production

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details (if available)"
}
```

## Development

The project uses:

- **Express.js** - Web framework
- **Prisma** - Database ORM
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

## Database

The application uses MySQL with the following features:

- `Media` table with UUID primary keys
- Automatic timestamps for `createdAt` and `updatedAt`
- Indexed fields for better query performance

### Switching to SQLite (Optional)

If you want to use SQLite instead of MySQL for easier local development:

1. Update `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. Remove `DATABASE_URL` from your `.env` file

3. Run migrations again:
   ```bash
   rm -rf prisma/migrations
   npm run migrate:dev
   ```

## Testing the API

Once the server is running, you can test the endpoints:

1. **Health Check**: Visit `http://localhost:5000/health`
2. **Get All Media**: Visit `http://localhost:5000/api/media`
3. **Use curl or Postman** for POST, PUT, DELETE operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
