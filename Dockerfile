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

COPY package.json /usr/src/sitemanager-frontend
COPY yarn.lock /usr/src/sitemanager-frontend

COPY . /usr/src/sitemanager-frontend
RUN yarn install

RUN yarn run build
EXPOSE 1337

CMD ["yarn", "start"]