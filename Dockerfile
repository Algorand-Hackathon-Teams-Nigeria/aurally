FROM node:20.11.0-bullseye AS builder
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN  npm install
COPY . .
RUN npm run build
# RUN rm -rf .env.local
FROM node:20.11.0-bullseye AS runner
WORKDIR /app
RUN addgroup --system --gid 1002 nodejs && adduser --system --uid 1002 nextjs
RUN chown -R nextjs:nodejs /app
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
USER 1002
EXPOSE 3000

CMD ["npm", "start"]
