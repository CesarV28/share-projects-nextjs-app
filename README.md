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

## Initialice Grafbase cli and copy credentials in .env
```
npx grafbase@0.24 dev
```

## Configure .env file
```
cp .example.env .env
```

## Create Next Auth Secret for .env
```
openssl rand -base64 32
```