# start with Node base image version 14
FROM node:14

# install any Linux packages
RUN apt-get update
RUN apt-get -y install vim

# set working directory
WORKDIR /app

# installs any npm dependencies specified in package_json
RUN npm install

CMD bash
