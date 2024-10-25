## On on Air

_A community driven Index for new/independent/experimental/punk/niche/nerdy/experimental/contemporary web radios._

This app is using the follwing stack:

- Docker
- NextJS 15
- Prisma
- PostgreSQL

## How to run

In Development mode:
1. Make start
2. Make migrate (If you are running for the first time, you deleted the volume, rebuild the container or made changes to the schema)
3. Make studio (If you want to see the database in the browser)
4. Make stop

In Production mode:
5. Make start-prod
6. Make migrate-prod
7. Make stop-prod