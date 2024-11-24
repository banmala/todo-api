export const authMiddleware = (req, res, next) => {
  //use the req object to check if the user is authenticated or not

  const isAuthenticated = true;

  if (!isAuthenticated) res.send({ error: "Not authorized" });

  next();
};
