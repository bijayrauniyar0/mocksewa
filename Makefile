.PHONY: dev

dev:
	docker compose -f backend/docker-compose.yml up -d
	cd frontend && pnpm dev