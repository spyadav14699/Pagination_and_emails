const app = require("./index")


const connect = require("./config/db")


app.listen(2244, async () => {
    await connect()
    console.log("listning on port 2244")
})
