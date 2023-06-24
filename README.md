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

## Crear un archivo donde se harán las llamadas a la base de datos con el nombre del orm, ejm:
 - supabase
 - prisma
 - typeorm
```
mkdir [folder_name]
```

## Create model database if necesary:
 - supabase
 - prisma
 - typeorm
```
mkdir [folder_name]
```

## Configure .env file
```
cp .example.env .env
```

## Create Next Auth Secret for .env
```
openssl rand -base64 32
```