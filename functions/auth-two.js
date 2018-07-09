import cookie from 'cookie'
import jwt from 'jsonwebtoken'

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

  let decodedToken
  try {
    decodedToken = jwt.decode(params.token, { complete: true })
    console.log('decodedToken', decodedToken)
  } catch (e) {
    console.log(e)
  }

  const html = `
  <html>
    <style>
      h1 { color: #73757d; }
      body { width: 100%; }
    </style>
    <body>
      <h1>Set Cookie</h1>
    <p>cookie set. check dev tools</p>
    <h2>Cookie value:</h2>
    <code><pre>${myCookie}</pre></code>
    <h2>Json web token:</h2>
    <code><pre>${JSON.stringify(decodedToken, null, 2)}</pre></code>
    </body>
  </html>`;

  const cookieResponse = {
    "statusCode": 200,
    // "Location" : process.env.URL,
    "headers": {
      "Set-Cookie": myCookie,
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html',
    },
    "body": html
  }
  console.log('site1 cookieResponse', cookieResponse)

  // set cookie and redirect
  return callback(null, cookieResponse);
}
