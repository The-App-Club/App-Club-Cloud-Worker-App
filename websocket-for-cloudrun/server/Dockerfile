# https://hub.docker.com/_/node
FROM node:16-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

# Copy local code to the container image.
COPY . .

EXPOSE 5000

# Run the web service on container startup.
CMD [ "node", "index.js" ]