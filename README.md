# Media Converter API

## Description

Node JS API for converting media.

## Preparing

```bash
git clone https://github.com/KomelT/media-converter-api.git
cd media-converter-api
npm i
cp .env.sample .env
```

### Development

#### NPM

```bash
npm run dev
```

#### Docker

```bash
docker compose -f docker-compose.dev.yaml up
```

### Production

#### NPM

```bash
npm run build
npm run start
```

#### Docker

```bash
docker compose up
```

## Changelog

**1.0.1**

- Added monitoring of incoming & outcommig traffic

**1.0.0**

- Added POST route /api/photo
