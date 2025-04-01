FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install @rollup/rollup-linux-x64-gnu --save-optional

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]
