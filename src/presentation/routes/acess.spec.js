const AcessRouter = require('./acess')

const RequiredParamError = require('../errors/required-param')
const InvalidParamError = require('../errors/invalid-param')
const UnauthorizedError = require('../errors/unauthorized')
const ServerError = require('../errors/server')

class AuthUseCaseSpy {
  async auth (phoneNumber, dateBirth) {
    this.phoneNumber = phoneNumber
    this.dateBirth = dateBirth

    return this.acessToken
  }
}

class AuthUseCaseSpyWithError {
  async auth () {
    throw new Error()
  }
}

class PhoneNumberValidatorSpy {
  isValid (phoneNumber) {
    this.phoneNumber = phoneNumber
    return this.isPhoneNumberValid
  }
}

class PhoneNumberValidatorSpyWithError {
  isValid (phoneNumber) {
    throw new Error()
  }
}

const makeSut = () => {
  const authUseCaseSpy = new AuthUseCaseSpy()
  const phoneNumberValidatorSpy = new PhoneNumberValidatorSpy()
  const sut = new AcessRouter(authUseCaseSpy, phoneNumberValidatorSpy)

  authUseCaseSpy.acessToken = 'valid_token'
  phoneNumberValidatorSpy.isPhoneNumberValid = true

  return { sut, authUseCaseSpy, phoneNumberValidatorSpy }
}

const makeSutWithAuthUseCaseError = () => {
  const authUseCaseSpyWithError = new AuthUseCaseSpyWithError()
  const phoneNumberValidatorSpy = new PhoneNumberValidatorSpy()
  const sut = new AcessRouter(authUseCaseSpyWithError, phoneNumberValidatorSpy)

  authUseCaseSpyWithError.acessToken = 'valid_token'
  phoneNumberValidatorSpy.isPhoneNumberValid = true

  return { sut, authUseCaseSpyWithError, phoneNumberValidatorSpy }
}

const makeSutWithPhoneNumberValidatorError = () => {
  const authUseCaseSpy = new AuthUseCaseSpy()
  const phoneNumberValidatorSpyWithError = new PhoneNumberValidatorSpyWithError()
  const sut = new AcessRouter(authUseCaseSpy, phoneNumberValidatorSpyWithError)

  authUseCaseSpy.acessToken = 'valid_token'
  phoneNumberValidatorSpyWithError.isPhoneNumberValid = true

  return { sut, authUseCaseSpy, phoneNumberValidatorSpyWithError }
}

describe('Acess Router', () => {
  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toEqual(new ServerError())
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toEqual(new ServerError())
  })

  test('Should return 500 if no AuthUseCase is provided', async () => {
    const sut = new AcessRouter()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toEqual(new ServerError())
  })

  test('Should return 500 if AuthUseCase has no auth method', async () => {
    const sut = new AcessRouter({})
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toEqual(new ServerError())
  })

  test('Should return 500 if AuthUseCase throws', async () => {
    const { sut } = makeSutWithAuthUseCaseError()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no PhoneNumberValidator is provided', async () => {
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new AcessRouter(authUseCaseSpy)
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toEqual(new ServerError())
  })

  test('Should return 500 if PhoneNumberValidator has no isValid method', async () => {
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new AcessRouter(authUseCaseSpy, {})
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toEqual(new ServerError())
  })

  test('Should return 500 if PhoneNumberValidator throws', async () => {
    const { sut } = makeSutWithPhoneNumberValidatorError()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 400 if no phone number is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toEqual(new RequiredParamError('phoneNumber'))
  })

  test('Should return 400 if no date birth is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toEqual(new RequiredParamError('dateBirth'))
  })

  test('Should return 400 if an invalid phone number is provided', async () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    phoneNumberValidatorSpy.isPhoneNumberValid = false
    const httpRequest = {
      body: {
        phoneNumber: '99999999999'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toEqual(new InvalidParamError('phoneNumber'))
  })

  test('Should return 401 when invalid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.acessToken = null
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)

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

  test('Should call PhoneNumberValidator with correct phone number', () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    sut.route(httpRequest)

    expect(phoneNumberValidatorSpy.phoneNumber).toBe(httpRequest.body.phoneNumber)
  })

  test('Should return 200 when valid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999',
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.message.acessToken).toEqual(authUseCaseSpy.acessToken)
  })
})
