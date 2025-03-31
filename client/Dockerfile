# client/Dockerfile
FROM node:20

WORKDIR /app

# package.json, lock 파일 복사
COPY package*.json ./

# 🔥 핵심: optional dependencies 설치 무시
RUN npm install --legacy-peer-deps --omit=optional

# 실제 소스 복사
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
