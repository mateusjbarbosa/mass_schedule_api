class AcessRouter {
  route (httpRequest) {
    if (!httpRequest.body.phone_number || !httpRequest.body.date_birth) {
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
        date_birth: '01/01/1990'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no date birth is provided', () => {
    const sut = new AcessRouter()
    const httpRequest = {
      body: {
        phone_number: '99999999999'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
