const oauthService = require("./auth.service");

function oauthProcessor(code, done) {
  oauthService.getGithubAccessToken(code, (err, token) => {
    if (err) {
      done(err)
    } else {
      done(null, token)
    }
  })
}

module.exports = {
  oauthProcessor
};