FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/todo-app /usr/share/nginx/html
EXPOSE 1414

CMD ["nginx", "-g", "daemon off;"]
