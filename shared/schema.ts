import { z } from "zod";
import { pgTable, text, real, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Old Zod schemas removed - now using schemas generated from Drizzle tables below

// Database Tables - javascript_database integration
export const sensorReadings = pgTable('sensor_readings', {
  id: uuid('id').primaryKey().defaultRandom(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  temperature: real('temperature').notNull(),
  ph: real('ph').notNull(),
  tdsLevel: real('tds_level').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const systemStatus = pgTable('system_status', {
  id: uuid('id').primaryKey().defaultRandom(),
  connectionStatus: text('connection_status', { enum: ['connected', 'disconnected', 'error'] }).notNull(),
  lastUpdate: timestamp('last_update').defaultNow().notNull(),
  dataPoints: integer('data_points').default(0).notNull(),
  cpuUsage: real('cpu_usage').default(0).notNull(),
  memoryUsage: real('memory_usage').default(0).notNull(),
  storageUsage: real('storage_usage').default(0).notNull(),
  uptime: text('uptime').notNull(),
});

export const alertSettings = pgTable('alert_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  temperatureAlerts: boolean('temperature_alerts').default(true).notNull(),
  phAlerts: boolean('ph_alerts').default(true).notNull(),
  tdsLevelAlerts: boolean('tds_level_alerts').default(false).notNull(),
});

// Generate Zod schemas from Drizzle tables
export const sensorReadingSchema = createSelectSchema(sensorReadings);
export const insertSensorReadingSchema = createInsertSchema(sensorReadings).pick({
  temperature: true,
  ph: true,
  tdsLevel: true,
}).extend({
  temperature: z.number().min(-50).max(100),
  ph: z.number().min(0).max(14),
  tdsLevel: z.number().min(0).max(2000),
});

export const systemStatusSchema = createSelectSchema(systemStatus);
export const alertSettingsSchema = createSelectSchema(alertSettings);
export const insertAlertSettingsSchema = createInsertSchema(alertSettings).omit({ id: true });

// TypeScript types
export type SensorReading = z.infer<typeof sensorReadingSchema>;
export type InsertSensorReading = z.infer<typeof insertSensorReadingSchema>;
export type SystemStatus = z.infer<typeof systemStatusSchema>;
export type AlertSettings = z.infer<typeof alertSettingsSchema>;
export type InsertAlertSettings = z.infer<typeof insertAlertSettingsSchema>;
