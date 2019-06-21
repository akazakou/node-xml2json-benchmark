# Stage "base": build main docker environment for any node.js application
FROM node:12-alpine as base

# Install your global runtime dependencies here that are required for service to operate
# Example: RUN apk add --update g++ make

WORKDIR /home/node/app/

# Stage "build": Install your build dependencies here (e.g those that are required only at a build time when doing npm install)
FROM base AS build
# Example: RUN apk add --update python python-dev

# Stage "dependencies": Build node_modules and put it into stage docker layer cache
FROM build AS dependencies
COPY package.json package-lock.json payload.xml.sample /home/node/app/
RUN npm ci

# Stage "release": Copy node_modules and from docker layer cache and update application source code
FROM base AS release
COPY --from=dependencies /home/node/app/node_modules ./node_modules
COPY --from=dependencies /home/node/app/payload.xml.sample ./payload.xml
COPY . /home/node/app/

ENTRYPOINT ["node", "/home/node/app/src/index.js"]
