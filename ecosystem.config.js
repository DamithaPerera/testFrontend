module.exports = {
    apps : [{
      name: "nextjs-app",
      instances: 'max',
      script: 'node_modules/next/dist/bin/next',
      args: "start",
      watch: true
    }]
  };