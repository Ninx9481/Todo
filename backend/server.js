require("dotenv").config()

const express = require("express")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")
const tokenRoutes = require("./routes/tokenRoutes")
const activityRoutes = require("./routes/activityRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", userRoutes)
app.use("/tokens", tokenRoutes)
app.use("/activities", activityRoutes)

app.listen(process.env.PORT, () => {
    console.log("server running on port", process.env.PORT)
})