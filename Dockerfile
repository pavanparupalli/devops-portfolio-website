FROM nginx:alpine

# Copy all HTML files
COPY *.html /usr/share/nginx/html/

# Copy static assets
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY assets /usr/share/nginx/html/assets
