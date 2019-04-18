const tokenExtractor = (request, response, next) => {
  let authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else if (authorization === "") {
    request.token = '';
  }
  next();
};
module.exports = {
  tokenExtractor
};
