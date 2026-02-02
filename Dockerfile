FROM node:18-bullseye

# System dependencies
RUN apt-get update && apt-get install -y \
  libreoffice \
  ghostscript \
  tesseract-ocr \
  tesseract-ocr-eng \
  poppler-utils \
  fonts-dejavu \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 10000

CMD ["node", "server.js"]
