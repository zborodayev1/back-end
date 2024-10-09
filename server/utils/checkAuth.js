import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers.Authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");

      req.userId = decoded._id;
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
  next();
};
