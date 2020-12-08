const models = [
  require('./models/user')
]

class GenerateTables {
  constructor() {
    this.models = models
  }

  async generate() {
    for (let modelIndex = 0; modelIndex < models.length; modelIndex++) {
      const model = models[modelIndex]

      await model.sync()
    }
  }
}

module.exports = new GenerateTables()