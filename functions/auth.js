import cookie from 'cookie'

exports.handler = (event, context, callback) => {
  console.log('queryStringParameters', event.queryStringParameters)

  const params = event.queryStringParameters
  const authToken = params.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzEwOTAzNjIsInN1YiI6ImZiYWQzNjMyLWY3MGEtNDFiYi04OWVjLTM2Y2NjZGZmMTk2MyIsImVtYWlsIjoiZGF2aWRncmVnb3J5d2VsbHNAZ21haWwuY29tIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwifSwidXNlcl9tZXRhZGF0YSI6eyJmdWxsX25hbWUiOiJEYXZpZCJ9fQ.Hq95G9nbCaTxUfbWZfR0lXkC6vRsu-9lnRkX0bHX3M8'
  const referrer = event.headers.referer
  console.log('process.env.URL', process.env.URL)
  console.log('referer', referrer)
  console.log('set token', authToken)

  const myCookie = cookie.serialize('nf_jwt', authToken, {
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
    //expires: expiresValue
  })

  const cookieResponse = {
    "statusCode": 302,
    "Location" : process.env.URL,
    "headers": {
      "Set-Cookie": myCookie
    }
  }
  console.log('cookieResponse', cookieResponse)

  // set cookie and redirect
  return callback(null, cookieResponse);

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
    	data: 'foo',
      event: event,
      context: context
    })
  })
}
