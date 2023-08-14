FROM node:20 AS builder

WORKDIR /workspace

COPY . .

RUN yarn -s
RUN npx prisma generate
RUN yarn build

FROM node:20

COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/prisma ./prisma
COPY --from=builder /workspace/package.json .
COPY --from=builder /workspace/tsconfig.build.json .

CMD [ "yarn", "start" ]
