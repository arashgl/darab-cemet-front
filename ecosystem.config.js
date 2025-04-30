module.exports = {
  apps: [
    {
      name: "darab-cement-front",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
  deploy: {
    production: {
      user: "user",
      host: "host",
      ref: "origin/main",
      repo: "git repository url",
      path: "/home/darab-cemet-front",
      "post-deploy":
        "bun install && bun run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
