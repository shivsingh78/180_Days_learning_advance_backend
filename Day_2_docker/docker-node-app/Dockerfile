FROM ubuntu

# Install dependencies
RUN apt-get update && apt-get install -y curl

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Install pnpm
RUN npm install -g pnpm

WORKDIR /home/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["node", "index.js"]