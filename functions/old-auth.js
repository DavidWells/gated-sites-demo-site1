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
    maxAge: 60 * 60 * 24 * 7,
    domain: 'gated-sites-demo-site1.netlify.com'
    //expires: expiresValue
  })

  const cookieResponse = {
    "statusCode": 301,
    "Location" : process.env.URL,
    "headers": {
      "Set-Cookie": myCookie,
      'Cache-Control': 'no-cache'
    }
  }
  console.log('site1 cookieResponse', cookieResponse)

  // set cookie and redirect
  return callback(null, cookieResponse);
}