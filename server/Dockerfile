FROM node:20-bullseye

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
# (agar package-lock.json hai to npm ci bhi use kar sakte ho)

# Copy rest of backend code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]