# -------- Development Stage --------
FROM node:lts-alpine AS dev

WORKDIR /usr/src/app

# Copy package.json and lock file
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy app source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Install nodemon for hot reload
RUN npm install -g nodemon

EXPOSE 4000

CMD ["nodemon", "--legacy-watch", "--inspect=0.0.0.0:9229", "src/index.js"]

# -------- Production Stage --------
FROM node:lts-alpine AS prod

WORKDIR /usr/src/app

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN mkdir -p /usr/src/app/logs && chown appuser:appgroup /usr/src/app/logs
USER appuser

# Copy package.json & node_modules from builder stage
COPY package.json package-lock.json* ./
COPY --from=dev /usr/src/app/node_modules ./node_modules

# Copy app source
COPY --from=dev /usr/src/app/src ./src
COPY --from=dev /usr/src/app/prisma ./prisma
COPY --from=dev /usr/src/app/generated ./generated

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health || exit 1

CMD ["node", "src/index.js"]
