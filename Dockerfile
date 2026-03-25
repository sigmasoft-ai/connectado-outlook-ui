FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Serve out of the /usr/share/nginx/html/connectado_outlook directory
RUN mkdir -p /usr/share/nginx/html/connectado_outlook
COPY --from=build /app/dist /usr/share/nginx/html/connectado_outlook
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
