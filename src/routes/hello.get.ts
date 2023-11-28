import { express } from "../express.js"
import { authenticate } from "../middlewares/authenticate.js"

express.get("/api/hello", authenticate, async (req, res) => {
  res.send("Hello")
})
console.log("API:EXPRESS registered route GET:/api/hello")
