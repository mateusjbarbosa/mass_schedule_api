module.exports = app => {
  app.get('/', (_, res) => {
    res
      .status(200)
      .send({
        'message': 'Welcome to Mass Schedule API!',
        'docs': "http://example.com/api/docs"
      })
  })
}