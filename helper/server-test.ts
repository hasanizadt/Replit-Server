import express from 'express';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { router } from './server/routes';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import * as schema from './shared/schema';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle({ client: pool, schema });

  console.log('Checking database tables...');
  
  try {
    const usersResult = await pool.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)', ['users']);
    const productsResult = await pool.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)', ['products']);
    
    console.log('Users table exists:', usersResult.rows[0].exists);
    console.log('Products table exists:', productsResult.rows[0].exists);

    // If tables don't exist, create them
    if (!usersResult.rows[0].exists || !productsResult.rows[0].exists) {
      console.log('Creating tables...');
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          full_name TEXT,
          is_admin BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          price INTEGER NOT NULL,
          stock_quantity INTEGER DEFAULT 0,
          user_id INTEGER REFERENCES users(id),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('Tables created');
    }
  } catch (error) {
    console.error('Error checking tables:', error);
  }

  // Setup Express app
  const app = express();
  app.use(express.json());
  
  // Setup API routes
  app.use(router);
  
  // Basic health check route
  app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
  });
  
  // Handle 404
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
  
  // Start server
  const PORT = parseInt(process.env.PORT || '3000', 10);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});