FROM node:16
WORKDIR /usr/share/node37_BE

COPY package.json .
RUN yarn install --production --ignore-engines

COPY prisma ./prisma/
RUN yarn prisma generate

COPY . .

CMD ["yarn","start"]