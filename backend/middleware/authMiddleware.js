import jwt from "jsonwebtoken";

const protectAdmin = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: "No token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") throw new Error();
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default protectAdmin;
