# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Enable Corepack to manage Yarn versions
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Copy package.json, yarn.lock, and .yarnrc.yml
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install

# Copy the rest of the application code and build
COPY . .
RUN yarn build

# Stage 2: Serve
FROM node:20-alpine

WORKDIR /app

# Enable Corepack and install serve globally
RUN corepack enable && yarn global add serve

# Copy the built assets from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
