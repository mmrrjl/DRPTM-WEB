# HydroMon Dashboard

## Overview

HydroMon Dashboard is a hydroponic monitoring system that provides real-time visualization and management of sensor data for hydroponic systems. The application features a React-based frontend with a Node.js backend, integrating with the Antares IoT platform to collect temperature, pH, and TDS (Total Dissolved Solids) sensor readings. The system includes interactive charts, real-time monitoring, alert management, and data export capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query for server state management and data fetching
- **UI Components**: Radix UI primitives wrapped with custom styling for accessibility and consistency

The frontend follows a component-based architecture with clear separation between UI components, pages, and data fetching logic. Components are organized into reusable modules with proper TypeScript definitions.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Runtime**: tsx for TypeScript execution in development
- **API Design**: RESTful API endpoints for sensor data, system status, and alert settings
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Features**: Hot reloading with Vite integration and request logging

### Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL adapter (currently configured for in-memory fallback)
- **Database**: PostgreSQL (optional, with fallback to in-memory storage)
- **Connection Management**: Lazy database initialization with connection pooling via Neon serverless
- **Schema Management**: Zod schemas generated from Drizzle table definitions for validation
- **Migrations**: Automated database migrations through Drizzle Kit

The storage layer implements a fallback mechanism that allows the application to run without database persistence during development or when database connection is unavailable.

### External Dependencies

#### IoT Platform Integration
- **Antares IoT Platform**: Primary data source for sensor readings with configurable API endpoints
- **Data Synchronization**: Manual and automatic sync capabilities with the IoT platform
- **Device Support**: Multi-device support with different sensor configurations (Cabai, Melon, Selada, Greenhouse, Hydroponic)

#### Database Services
- **Neon Database**: Serverless PostgreSQL with WebSocket support for production deployments
- **connect-pg-simple**: PostgreSQL session store for user sessions

#### UI and Visualization
- **Recharts**: Chart library for sensor data visualization with time-series support
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting utilities
- **React Hook Form**: Form handling with validation support

#### Development Tools
- **TypeScript**: Type safety across the entire application stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **Cross-env**: Cross-platform environment variable management
- **dotenv**: Environment variable management for configuration

The application is designed to be flexible with its data sources, supporting both live IoT data and fallback scenarios, making it suitable for development, testing, and production environments.