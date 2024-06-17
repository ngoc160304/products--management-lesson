const mongoose = require('mongoose');
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MOONGO_URL);
        console.log("connect succcess");
    } catch (error) {
        console.log(error)
        console.log("Connect Error");
    }
}