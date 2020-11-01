# Start from a Node.js 10 (LTS) image
From node:10

# Sepcify the directory inside the image in which all commands will run
WORKDIR /Users/dacksmilliken/sites/BikeTour

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all of the app files into the image
COPY . .

# The default command to run when starting the container
CMD ["npm", "start"]
