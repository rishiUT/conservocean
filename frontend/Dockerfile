# start with Node base image version 14
FROM node:14

# install any Linux packages
RUN apt-get update
RUN apt-get -y install vim

# set working directory
WORKDIR /usr/src/app

# install any npm dependencies specified in package_json
COPY package*.json ./
RUN npm install

RUN pip install selenium

# expose port 8080 for local web server
EXPOSE 8080

CMD bash
