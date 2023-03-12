# Basic.
FROM node:19-alpine
WORKDIR /app

# Update the container
RUN apk update
RUN apk upgrade

# Change the owner to node.
RUN chown node /app
USER node

# Install the project dependencies.
COPY --chown=node package.json tsconfig.json ./
RUN yarn

# Copy the project to the container.
COPY --chown=node src ./src

# Start the container.
CMD yarn run start:prod
