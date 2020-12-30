const RequiredParamError = require('../errors/required-param')

const HttpResponse = require('../helpers/http-response')

module.exports = class AcessRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { phoneNumber, dateBirth } = httpRequest.body

      if (!phoneNumber) {
        return HttpResponse.badRequest(new RequiredParamError('phoneNumber'))
      }

      if (!dateBirth) {
        return HttpResponse.badRequest(new RequiredParamError('dateBirth'))
      }

      const acessToken = await this.authUseCase.auth(phoneNumber, dateBirth)

      if (!acessToken) {
        return HttpResponse.unauthorized()
      }

      return HttpResponse.ok({ acessToken })
    } catch (e) {
      return HttpResponse.internalServerError()
    }
  }
}
