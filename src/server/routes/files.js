module.exports = [
  {
    method: 'GET',
    path: '/files/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      },
    },
  },
]
