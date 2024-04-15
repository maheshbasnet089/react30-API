require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
// ROUTES 
const userRoute = require("./routes/userRoute")
const { connectDatabase } = require("./database/database")

app.use(cors({
    origin : '*'
}))
app.use(express.json())

connectDatabase(process.env.MONGO_URI)

app.get("/",(req,res)=>{
    res.send("<h1>Hello I am alive</h1>")
})

app.use("/api/user",userRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`[server] has started at port ${PORT}`)
})



