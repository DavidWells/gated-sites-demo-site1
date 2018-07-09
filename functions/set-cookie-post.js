import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import util from 'util'

exports.handler = (event, context, callback) => {
  const payload = JSON.parse(event.body)

  const authToken = event.headers.authorization.substring(7)
  const referrer = event.headers.referer
  console.log('process.env.URL', process.env.URL)
  console.log('referer', referrer)
  console.log('set token', authToken)

  // invalid token - synchronous
  const secret = 'secret'
  try {
    var valid = jwt.verify(authToken, secret);
    console.log('authToken valid', valid)
  } catch(err) {
    console.log('verify error', err)
    console.log(err.name)
    console.log(err.message)
  }
  var hour = 3600000;
  var twoWeeks = 14 * 24 * hour
  const myCookie = cookie.serialize('nf_jwt', authToken, {
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: twoWeeks,
    // domain: 'gated-sites-demo-site1.netlify.com'
    // expires: expiresValue
  })

  let decodedToken
  try {
    decodedToken = jwt.decode(params.token, { complete: true })
    console.log('decodedToken')
    console.log(util.inspect(decodedToken, false, null))
  } catch (e) {
    console.log(e)
  }

  const cookieResponse = {
    "statusCode": 200,
    "headers": {
      "Set-Cookie": myCookie,
      'Cache-Control': 'no-cache',
    },
    "body": ''
  }
  console.log('site1 cookieResponse POST', cookieResponse)
  // set cookie and redirect
  return callback(null, cookieResponse);
}
