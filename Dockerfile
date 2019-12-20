FROM node:12-alpine AS build
WORKDIR /app
COPY package.json yarn.lock .babelrc global.d.ts tsconfig.json ./
COPY src src/
RUN yarn install --frozen-lockfile && \
    yarn build && \
    yarn install --production --ignore-scripts --prefer-offline

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app/dist dist/
COPY --from=build /app/node_modules node_modules/
COPY --from=build /app/package.json .
RUN chown -R node:node .
USER node
CMD ["/app/node_modules/.bin/pm2-runtime", "/app/dist/index.js", "-i", "max"]
