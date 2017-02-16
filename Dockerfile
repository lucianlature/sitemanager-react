FROM node:7.5.0
MAINTAINER Lucian Lature <lucian.lature@constant.co>

# Install YARN
RUN apt-get update && apt-get install apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

RUN mkdir -p /usr/src/sitemanager-frontend
WORKDIR /usr/src/sitemanager-frontend

ONBUILD ARG NODE_ENV
ONBUILD ENV NODE_ENV $NODE_ENV

# COPY package.json /usr/src/sitemanager-frontend
# COPY yarn.lock /usr/src/sitemanager-frontend

ADD package.json yarn.lock /tmp/
RUN mkdir -p /tmp/tools && mkdir -p /tmp/tools/scripts
COPY ./tools/scripts /tmp/tools/scripts

# Copy cache contents (if any) from local machine
COPY .yarn-cache.tgz /usr/src/sitemanager-frontend

COPY . /usr/src/sitemanager-frontend

# Install packages
RUN cd /tmp && yarn
RUN cd /usr/src/sitemanager-frontend && ln -s /tmp/node_modules

# Build app for production
RUN yarn run build
EXPOSE 1337

CMD ["yarn", "start"]