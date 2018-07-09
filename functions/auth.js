import cookie from 'cookie'

exports.handler = (event, context, callback) => {
  console.log('queryStringParameters', event.queryStringParameters)

  const params = event.queryStringParameters
  const authToken = params.token
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
    "statusCode": 301,
    "Location" : process.env.URL,
    "headers": {
      "Set-Cookie": myCookie
    }
  }
  console.log('cookieResponse', cookieResponse)

  // set cookie and redirect
  return callback(null, cookieResponse);
}
