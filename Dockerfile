# Step 0: Setup base
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Step 1: Install dependencies
FROM base AS deps
ARG APP
WORKDIR /app
COPY /apps/${APP}/package.*json /apps/${APP}/*lock* /app/
RUN pnpm install

# Step 2: Build
FROM deps AS build
WORKDIR /app/
ARG APP
COPY /apps/${APP} .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

# Step 3: Prepare runtime env
FROM base AS runtime
WORKDIR /app/ 

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=build --chown=nextjs:nodejs /app/*next.config.js /app/*.ts /app/*.json /app/*.html ./
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.env ./.env

EXPOSE 3000
CMD [ "pnpm", "start" ]
