import express from "express";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

export default router;

// import express from "express";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// // Admin login
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   if (
//     email === process.env.ADMIN_EMAIL &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     return res.json({ token });
//   }
//   res.status(401).json({ message: "Invalid credentials" });
// });

// export default router;

