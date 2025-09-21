import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;
// Use secure WebSocket for production safety
neonConfig.useSecureWebSocket = process.env.NODE_ENV === 'production';

// Lazy database connection - don't throw on import
let _db: ReturnType<typeof drizzle> | null = null;
let _pool: Pool | null = null;
let _databaseAvailable = false;

function initializeDatabase() {
  if (_db && _pool) return { db: _db, pool: _pool, available: _databaseAvailable };
  
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️ DATABASE_URL not set, running without database persistence');
      _databaseAvailable = false;
      return { db: null, pool: null, available: false };
    }

    // Secure SSL configuration
    const sslConfig = process.env.NODE_ENV === 'production' 
      ? { rejectUnauthorized: true }  // Secure for production
      : false;  // Flexible for development
    
    _pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ssl: sslConfig,
    });
    
    _db = drizzle({ client: _pool, schema });
    _databaseAvailable = true;
    console.log('✅ Database connection initialized securely');
    return { db: _db, pool: _pool, available: true };
  } catch (error) {
    console.warn('⚠️ Failed to initialize database:', (error as Error).message);
    _databaseAvailable = false;
    return { db: null, pool: null, available: false };
  }
}

export function getDatabaseConnection() {
  return initializeDatabase();
}

// Export database availability check
export function isDatabaseAvailable() {
  const { available } = initializeDatabase();
  return available;
}

// For backward compatibility - but safer
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    const { db: realDb } = initializeDatabase();
    if (!realDb) {
      throw new Error('Database not available');
    }
    return (realDb as any)[prop];
  }
});

export const pool = new Proxy({} as Pool, {
  get(target, prop) {
    const { pool: realPool } = initializeDatabase();
    if (!realPool) {
      throw new Error('Database pool not available');
    }
    return (realPool as any)[prop];
  }
});
