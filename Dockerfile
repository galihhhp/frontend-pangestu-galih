FROM node:24-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:24-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
EXPOSE 5173
CMD ["npm", "run", "dev"]