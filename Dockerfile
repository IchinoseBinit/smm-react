# from main 
# FROM node:20-alpine AS builder

# # Faster installs and smaller image
# ENV NODE_ENV=production

# WORKDIR /app

# # Enable Corepack to manage Yarn versions
# RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# # Copy only files needed for dependency install to leverage Docker layer cache
# COPY package.json yarn.lock .yarnrc.yml ./
# # Copy Yarn's repo-local binary & plugins (required for Yarn Berry)
# COPY .yarn/ .yarn/
# # If you use PnP, uncomment these:
# # COPY .pnp.cjs ./
# # COPY .pnp.loader.mjs ./

# # Install dependencies (fail if lockfile is out-of-sync)
# RUN yarn install --immutable

# # Now copy the rest of the source and build
# COPY . .
# RUN yarn build


# # ---------- Stage 2: Runtime (static server) ----------
# FROM node:20-alpine

# ENV NODE_ENV=production
# WORKDIR /app

# # Use npm for global install; simpler than Berry globals
# RUN npm i -g serve@14

# # Copy built assets from builder
# COPY --from=builder /app/dist ./dist

# # Use a conventional static port; keep 5173 if you depend on it elsewhere
# EXPOSE 5173

# # Serve the static build
# CMD ["serve", "-s", "dist", "-l", "5173"]


# From Production 


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