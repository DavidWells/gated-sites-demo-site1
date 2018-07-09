exports.handler = (event, context, callback) => {
  console.log(event.body)
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
    	data: 'foo'
    })
  })
}
