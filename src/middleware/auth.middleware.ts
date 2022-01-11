import jwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

// export const checkJwt = jwt({
//   // secret: process.env.JWT_SECRET
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: process.process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.process.env.AUTH0_DOMAIN}/`,
//   algorithms: ["RS256"]
// });

export const checkJwt = jwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ["HS256"],
  requestProperty: "user",
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  },
});
