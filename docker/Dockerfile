ARG NODE_VERSION
FROM node:$NODE_VERSION-stretch

# Add Yarn to the sources list
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y yarn \
  && yarn global add yalc

RUN mkdir /app

WORKDIR /app

COPY docker/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
