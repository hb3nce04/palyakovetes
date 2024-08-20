FROM node:22-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
# RUN npx prisma db push
# RUN npm prisma seed
EXPOSE 3000
CMD ["npm", "run", "dev"]