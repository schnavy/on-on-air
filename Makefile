# Variables
COMPOSE_FILE=docker-compose.yml
COMPOSE_DEV_FILE=docker-compose.dev.yml
COMPOSE_PROD_FILE=docker-compose.prod.yml

# Default target
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make up           - Start development environment"
	@echo "  make down         - Stop development environment"
	@echo "  make build        - Build development images"
	@echo "  make up-prod      - Start production environment"
	@echo "  make down-prod    - Stop production environment"
	@echo "  make build-prod   - Build production images"
	@echo "  make migrate      - Run Prisma migrations (dev)"
	@echo "  make migrate-prod - Run Prisma migrations (prod)"

# Development
.PHONY: up
up:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) up -d

.PHONY: down
down:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) down

.PHONY: build
build:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) build

.PHONY: migrate
migrate:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) exec app npx prisma migrate dev

# Production
.PHONY: up-prod
up-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) up -d

.PHONY: down-prod
down-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) down

.PHONY: build-prod
build-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) build

.PHONY: migrate-prod
migrate-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) exec app npx prisma migrate deploy
