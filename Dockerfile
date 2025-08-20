FROM node:22.18.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "test"]
