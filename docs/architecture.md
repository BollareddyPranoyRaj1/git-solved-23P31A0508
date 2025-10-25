# System Architecture

## Overview
DevOps Simulator follows a microservices architecture designed for high availability and scalability.

**Current Version**: Supports both production and development environments with experimental features in beta.

## Components

### 1. Application Server
- **Technology**: Node.js + Express
- **Port**: 8080 (production), 3000 (development)
- **Scaling**: Horizontal auto-scaling enabled (production), Manual single instance (development)
- **Debug**: Chrome DevTools debugger on port 9229 (development only)
- **Hot Reload**: Enabled in development mode

### 2. Database Layer
- **Database**: PostgreSQL 14
- **Configuration**: 
  - Production: Master-slave replication
  - Development: Single local instance
- **Backup**: Daily automated backups (production), Manual backups (development)
- **Seeding**: Auto-seed with test data on startup (development only)

### 3. Monitoring System
- **Tool**: Prometheus + Grafana (production), Basic console logging + optional Prometheus (development)
- **Metrics**: CPU, Memory, Disk, Network, Build time (dev only)
- **Alerts**: Email notifications for critical issues (production), Console warnings (development)
- **Dashboard**: Grafana dashboards (production), In-development web dashboard (beta)

### 4. Container Orchestration (NEW)
- **Tool**: Docker Compose
- **Services**: App, Database, Redis cache
- **Volume Mounts**: Code directory for hot reload (development)
- **Environment**: Local development, production-ready configuration available

### 5. Authentication System (NEW - Beta)
- **Method**: OAuth2 + JWT
- **Providers**: Google, GitHub (testing phase)
- **Sessions**: Redis-based session storage

## Deployment Strategy
- **Production Method**: Rolling updates with zero-downtime
- **Development Method**: Docker Compose hot reload
- **Rollback**: Automated on failure (production), Git checkout previous commit (development)

## Development Workflow
1. Make code changes
2. Auto-reload triggers rebuild
3. Run unit tests
4. Check console logs
5. Commit when ready

## Security
### Production
- SSL/TLS encryption enabled
- Database connection encryption
- Regular security audits
- Restricted CORS policies

### Development
- SSL/TLS disabled for local development
- Database credentials in plain text (dev only)
- CORS enabled for all origins
- Debug endpoints exposed (dev only)

## Experimental Features
⚠️ **Warning**: The following features are experimental and under active development:
- Multi-cloud deployment support
- AI-powered log analysis
- Automatic rollback on anomaly detection
