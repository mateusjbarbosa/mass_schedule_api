const AcessRouter = require('./acess')

const RequiredParamError = require('../errors/required-param')
const UnauthorizedError = require('../errors/unauthorized')

class AuthUseCaseSpy {
  auth (phoneNumber, dateBirth) {
    this.phoneNumber = phoneNumber
    this.dateBirth = dateBirth

    return this.acessToken
  }
}

const makeSut = () => {
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new AcessRouter(authUseCaseSpy)

  authUseCaseSpy.acessToken = 'valid_token'

  return { sut, authUseCaseSpy }
}

describe('Acess Router', () => {
  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no AuthUseCase is provided', () => {
    const sut = new AcessRouter()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if AuthUseCase has no auth method', () => {
    const sut = new AcessRouter({})
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 400 if no phone number is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toEqual(new RequiredParamError('phoneNumber'))
  })

  test('Should return 400 if no date birth is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toEqual(new RequiredParamError('dateBirth'))
  })

  test('Should return 401 when invalid credentials are provided', () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.acessToken = null
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.message).toEqual(new UnauthorizedError())
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    sut.route(httpRequest)

    expect(authUseCaseSpy.phoneNumber).toBe(httpRequest.body.phoneNumber)
    expect(authUseCaseSpy.dateBirth).toBe(httpRequest.body.dateBirth)
  })

  test('Should return 200 when valid credentials are provided', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.message.acessToken).toEqual(authUseCaseSpy.acessToken)
  })
})
