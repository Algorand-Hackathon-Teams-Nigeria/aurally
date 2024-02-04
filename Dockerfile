FROM node:20.11.0-bullseye AS builder
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN  npm install
COPY . .
RUN npm run build

FROM node:20.11.0-bullseye AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER 1001
EXPOSE 3000
# ENV PORT 3000
CMD ["npm", "start"]