# Базовий образ для збірки Vite
FROM node:20-alpine as build

# Робоча директорія
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY . .

# Збираємо проект Vite
RUN npm run build

# Перевіряємо створення папки dist
RUN ls -la /app/dist

# Фінальний образ на базі Nginx
FROM nginx:alpine

# Копіюємо зібрані файли Vite в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Налаштовуємо Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Відкриваємо порт
EXPOSE 80

# Запускаємо Nginx
CMD ["nginx", "-g", "daemon off;"]
