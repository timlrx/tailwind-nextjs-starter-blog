FROM node:18-alpine AS production
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable
RUN corepack prepare yarn@3.6.1 --activate
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install
RUN EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/blog yarn build # remove BASE_PATH IF FAILING

CMD ["yarn", "serve"]
