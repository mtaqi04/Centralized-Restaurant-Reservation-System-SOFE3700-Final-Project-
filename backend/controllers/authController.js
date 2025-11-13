import jwt from "jsonwebtoken";

// Hardcoded user (easy for the quiz)
const users = [
  {
    id: 1,
    username: "admin",
    password: "1234",
    role: "admin"
  },
  {
    id: 2,
    username: "owner",
    password: "1234",
    role: "owner"
  },
  {
    id: 3,
    username: "customer",
    password: "1234",
    role: "customer"
  }
];
export const login = (req, res) => {
  const { username, password } = req.body;

  // 1. Validate request body
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // 2. Check if user exists
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 3. Create JWT token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRES_IN || "1h" }
  );

  // 4. Respond with token + user info
  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
};

export const logout = (req, res) => {
  return res.status(200).json({ message: "Logged out successfully" });
};
