# Basics.
FROM python:3.10-alpine
WORKDIR /app

# Create user.
RUN adduser -D user
RUN chown -R user /app

# Update the container.
RUN apk update
RUN apk upgrade
RUN apk add npm
RUN npm i -g typescript

# Install the dependencies.
COPY --chown=user requirements.txt .
USER user
RUN pip3 install -r requirements.txt

# Get and build the scripts.
COPY --chown=user scripts tsconfig.json ./
RUN tsc

# Copy the project.
COPY --chown=user public /app/public
COPY --chown=user src /app/src

# Install the npm and then build the script.
RUN tsc

# Run the project.
CMD python3 -u src/index.py