# Variables
COMPOSE_FILE=docker-compose.yml
COMPOSE_DEV_FILE=docker-compose.dev.yml
COMPOSE_PROD_FILE=docker-compose.prod.yml

# Default target
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make start           - Start development environment"
	@echo "  make stop            - Stop development environment"
	@echo "  make build           - Build development images"
	@echo "  make sh              - Use Docker container shell"
	@echo "  make start-prod      - Start production environment"
	@echo "  make stop-prod       - Stop production environment"
	@echo "  make build-prod      - Build production images"
	@echo "  make migrate         - Run Prisma migrations (dev)"
	@echo "  make migrate-prod    - Run Prisma migrations (prod)"
	@echo "  make studio          - Open Prisma Studio"
	@echo "  make studio-stop     - Stop Prisma Studio"
	@echo "  make studio-logs     - View Prisma Studio logs"
# Development
.PHONY: start
start:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) up -d && open http://localhost:3000/

.PHONY: stop
stop:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) down

.PHONY: build
build:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) build

.PHONY: sh
sh:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) exec app sh

.PHONY: migrate
migrate:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) exec app npx prisma migrate dev

# Production
.PHONY: start-prod
start-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) up -d

.PHONY: stop-prod
stop-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) down

.PHONY: build-prod
build-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) build

.PHONY: migrate-prod
migrate-prod:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) exec app npx prisma migrate deploy

.PHONY: studio
studio:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) up -d prisma && open http://localhost:5555/

.PHONY: studio-stop
studio-stop:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) stop prisma

.PHONY: studio-logs
studio-logs:
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV_FILE) logs -f prisma