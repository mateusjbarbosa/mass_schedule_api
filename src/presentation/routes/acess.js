const HttpResponse = require('../helpers/http-response')

module.exports = class AcessRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.internalServerError()
    }

    const { phoneNumber, dateBirth } = httpRequest.body

    if (!phoneNumber) {
      return HttpResponse.badRequest('phoneNumber')
    }

    if (!dateBirth) {
      return HttpResponse.badRequest('dateBirth')
    }
  }
}
