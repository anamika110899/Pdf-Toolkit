FROM node:18-bullseye

# System dependencies for PDF tools
RUN apt-get update && apt-get install -y \
    libreoffice \
    tesseract-ocr \
    tesseract-ocr-eng \
    ghostscript \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# App directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy rest of backend code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]