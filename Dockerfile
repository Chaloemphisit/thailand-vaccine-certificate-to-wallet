# Base on offical Node.js Alpine image
FROM node:14.17.0-alpine

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

RUN export HUSKY=0

# Install dependencies
RUN yarn --frozen-lockfile --silent

# Copy all files
COPY ./ ./

# Build app
RUN yarn  build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "yarn", "start" ]
