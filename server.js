const app = require('./src/app');;
const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
});