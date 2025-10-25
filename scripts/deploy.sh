#!/bin/bash
# Deployment Script for DevOps Simulator
# Version: 2.0.0-beta
# Supports both production and development environments

set -e

echo "====================================="
echo "DevOps Simulator - Deployment Script"
echo "====================================="

# Determine environment (default to development if not set)
DEPLOY_ENV="${DEPLOY_ENV:-development}"

if [ "$DEPLOY_ENV" = "production" ]; then
    # Production Configuration
    DEPLOY_REGION="us-east-1"
    APP_PORT=8080
    
    echo "Environment: $DEPLOY_ENV"
    echo "Region: $DEPLOY_REGION"
    echo "Port: $APP_PORT"
else
    # Development Configuration
    DEPLOY_MODE="docker-compose"
    APP_PORT=3000
    ENABLE_DEBUG=true
    
    echo "Environment: $DEPLOY_ENV"
    echo "Mode: $DEPLOY_MODE"
    echo "Port: $APP_PORT"
    echo "Debug: $ENABLE_DEBUG"
fi

# Pre-deployment checks
echo "Running pre-deployment checks..."
if [ ! -f "config/app-config.yaml" ]; then
    echo "Error: Configuration file not found!"
    exit 1
fi

if [ "$DEPLOY_ENV" = "production" ]; then
    # Production Deployment
    echo "Starting production deployment..."
    echo "Pulling latest Docker images..."
    # docker pull devops-simulator:latest
    
    echo "Rolling update strategy initiated..."
    # kubectl rolling-update devops-simulator
    
    echo "Deployment completed successfully!"
    echo "Application available at: https://app.example.com"
else
    # Development Deployment
    echo "Starting development deployment..."
    
    # Install dependencies
    echo "Installing dependencies..."
    npm install
    
    # Run tests
    echo "Running tests..."
    npm test
    
    # Deploy with Docker Compose
    echo "Using Docker Compose..."
    docker-compose up -d
    
    # Wait for application to start
    echo "Waiting for application to be ready..."
    sleep 5
    
    # Health check
    echo "Performing health check..."
    curl -f http://localhost:$APP_PORT/health || exit 1
    
    echo "Deployment completed successfully!"
    echo "Application available at: http://localhost:$APP_PORT"
    echo "Hot reload enabled - code changes will auto-refresh"
fi
