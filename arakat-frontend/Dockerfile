FROM node:8

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.9.4
# Create app directory
RUN mkdir -p /usr/src/app


ADD package.json yarn.lock /tmp/
ADD .yarn-cache.tgz /
RUN cd /tmp && yarn
RUN cd /usr/src/app && ln -s /tmp/node_modules 

ENV API_WORKSPACE http://172.16.2.43:30988/

ADD . /usr/src/app/


EXPOSE 3000
WORKDIR /usr/src/app
CMD [ "yarn", "start" ]
