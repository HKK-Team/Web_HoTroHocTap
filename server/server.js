require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
// const morgan = require("morgan");


const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}));
// Router
app.use('/student',require('./src/Students/Routers/userRouters'))
app.use('/lecturer',require('./src/Lecturers/Routers/lecturerRouters'))
app.use('/subject',require('./src/Students/Routers/subjectRouters'))
app.use('/subjectScore',require('./src/Students/Routers/subjectScoreRouters'))
app.use('/sendEmail',require('./src/MailService/MailServiceRouter'))

// connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB')
    }
)
// load token for server
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
// connect to mongodb
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})