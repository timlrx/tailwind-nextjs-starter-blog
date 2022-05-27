module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/blog'],
      startServerCommand: 'yarn dev',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
