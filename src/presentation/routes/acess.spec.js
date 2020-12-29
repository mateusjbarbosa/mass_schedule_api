class AcessRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }

    const { phoneNumber, dateBirth } = httpRequest.body

    if (!phoneNumber || !dateBirth) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Acess Router', () => {
  test('Should return 400 if no phone number is provided', () => {
    const sut = new AcessRouter()
    const httpRequest = {
      body: {
        dateBirth: '01/01/1990'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no date birth is provided', () => {
    const sut = new AcessRouter()
    const httpRequest = {
      body: {
        phoneNumber: '99999999999'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const sut = new AcessRouter()
    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = new AcessRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })
})
