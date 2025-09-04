#!/bin/bash
echo "Stopping InsightFlo Development Environment..."
docker-compose -f infrastructure/docker/docker-compose.yml down
echo "Environment stopped."