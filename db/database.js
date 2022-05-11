const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((data) => {
    console.log("connected.")
}).catch((e) => {
    console.log("error.")
});
