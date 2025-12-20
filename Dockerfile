FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy EVERYTHING from project to nginx
COPY . /usr/share/nginx/html

EXPOSE 80
