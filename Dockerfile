# Dockerfile

# base image
FROM node:16-alpine

# create & set working directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# copy source files
COPY ./ ./

# install dependencies
RUN npm install

# start app
RUN npm run build
CMD npm run start