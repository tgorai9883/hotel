const express = require("express");
const app = express();

const dbConfig = require("./db");

const roomRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());// to receive parameter from boby
app.use("/api/rooms",roomRoute);
app.use("/api/users",userRoute);
app.use("/api/bookings",bookingsRoute);
 

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`server started on port ${port}`));