# Базовий образ для Node.js
FROM node:20-alpine

# Робоча директорія
WORKDIR /backend

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY . .

# Генеруємо Prisma клієнт
RUN npx prisma generate

# Компілюємо TypeScript
RUN npm run build

# Вказуємо порт для сервера
EXPOSE 3000

# Команда запуску
CMD ["npm", "run", "start:prod"]
