
import { db, pool } from "./db";
import { sql } from "drizzle-orm";
import fs from "fs";
import path from "path";

export async function initDatabase() {
  try {
    console.log("Initializing database...");
    
    // Create migrations tracking table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Get list of migration files
    const migrationsDir = path.join(process.cwd(), "migrations");
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    // Execute migrations that haven't been run yet
    for (const file of migrationFiles) {
      const result = await db.execute(sql`
        SELECT * FROM _migrations WHERE name = ${file}
      `);
      
      if (result.rows.length === 0) {
        console.log(`Running migration: ${file}`);
        const migrationPath = path.join(migrationsDir, file);
        const migrationSQL = fs.readFileSync(migrationPath, "utf-8");
        
        await db.execute(sql.raw(migrationSQL));
        await db.execute(sql`
          INSERT INTO _migrations (name) VALUES (${file})
        `);
        
        console.log(`Migration ${file} completed`);
      }
    }
    
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
