# node image version
FROM node:20.18-alpine

# open folder in docker
WORKDIR /docker-app

# copy package.json files to docker-app folder
COPY package*.json ./

# install all packages
RUN npm install

# copy other all files
COPY . .

# Sign port
EXPOSE 3000

# command which will run app
CMD ["npm","start"]