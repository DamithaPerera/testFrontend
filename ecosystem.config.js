module.exports = {
    apps : [{
      name: "nextjs-app",
      instances: 'max',
      script: 'node_modules/next/dist/bin/next',
      args: "start",
      env_local: {
        APP_ENV: 'local' // APP_ENV=local
      },
      watch: true
    }]
  };