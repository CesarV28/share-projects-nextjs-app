T
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Configure .env file
```
cp .example.env .env
```

## Create Next Auth Secret for .env
```
openssl rand -base64 32
```

## Initialice Grafbase cli
```
npx grafbase@.24 dev
```