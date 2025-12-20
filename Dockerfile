FROM nginx:alpine

# Copy main HTML
COPY index.html /usr/share/nginx/html/

# Copy static assets
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY assets /usr/share/nginx/html/assets
