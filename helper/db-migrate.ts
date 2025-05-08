import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import * as schema from './shared/schema';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle({ client: pool, schema });

  console.log('Running migrations...');
  
  // This will create the tables if they don't exist
  await migrate(db, { migrationsFolder: './drizzle' });
  
  console.log('Migrations complete');
  
  // Create a simple schema check to see if tables exist
  try {
    const usersResult = await pool.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)', ['users']);
    const productsResult = await pool.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)', ['products']);
    
    console.log('Users table exists:', usersResult.rows[0].exists);
    console.log('Products table exists:', productsResult.rows[0].exists);
  } catch (error) {
    console.error('Error checking tables:', error);
  }
  
  await pool.end();
}

main()
  .then(() => {
    console.log('Script executed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });