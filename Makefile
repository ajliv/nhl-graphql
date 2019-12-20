.PHONY: start stop local
.DEFAULT_GOAL := start

start:
	yarn install
	cp -n .env.example .env 2>/dev/null || :
	open http://localhost:4000/graphql
	docker-compose -f docker-compose.local.yml up --build

stop:
	docker-compose -f docker-compose.local.yml down

local:
	yarn install --frozen-lockfile
	pm2-dev --raw --interpreter babel-node --node-args "--extensions=.ts,.graphql" src/index.ts
