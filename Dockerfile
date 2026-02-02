FROM node:24-bullseye

RUN apt-get update && apt-get install -y \
    ghostscript \
    poppler-utils \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install

WORKDIR /app
COPY . .

EXPOSE 5000

CMD ["node", "server/index.js"]
