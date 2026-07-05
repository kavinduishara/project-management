FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

RUN chmod +x /app/start.sh

EXPOSE 3000 3001

CMD ["sh", "/app/start.sh"]