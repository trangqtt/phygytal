FROM node:16.14.0-alpine as base

# install simple http server for serving static content
RUN npm install -g pnpm
# make the 'app' folder the current working directory
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json pnpm-lock.yaml ./
# install project dependencies
RUN pnpm install

FROM base as build
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN pnpm build

FROM base AS app
WORKDIR /app
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/*.js /app/
COPY --from=build /app/public /app/public
COPY --from=build /app/next-env.d.ts /app/
COPY --from=build /app/.env /app/

EXPOSE 3000

CMD [ "pnpm", "start" ]