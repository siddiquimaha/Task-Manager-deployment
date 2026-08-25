# Lightweight Nginx image to serve static website
FROM nginx:alpine

# Copy website files into Nginx html directory
COPY src /usr/share/nginx/html

# Nginx listens on port 80 inside the container
EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]