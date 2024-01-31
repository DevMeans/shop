# Descripción

## Correr en dev

1. Clonar el repositorio
2. crear una copia de ```.env.template``` y renombrarlo a ```.env```
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. levantar base de datos ```docker compose up -d```
6. Correr las migraciones de Prisma ```npx prisma migrate dev```
7. Ejecutar seed ```npm run seed```
8. Correr el proyecto ```npm run dev```

## Correr en prod