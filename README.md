## @org mono repo (pnpm + Nx)

### Prerequisites
- pnpm
- Node 18+
- Docker (for local registry)

### Install
```bash
pnpm install
```

### Local registry
```bash
pnpm dev:registry   # start Verdaccio at http://localhost:4873
```
Root `.npmrc` already points `@org` scope to the local registry.

### Projects
- libs/common-test-cucumber-playwright: Shared Cucumber + Playwright test lib
- apps/formal-e2e-tests: Example E2E app

### Run tests
```bash
pnpm e2e
# or parallel
CONCURRENCY=4 pnpm e2e
```

### Sample test
The feature calls `https://echo.free.beeceptor.com/...` and asserts response equals `apps/formal-e2e-tests/expected/EXPECTED_RESPONSE.json`.


