const app = require('./src/app');;
const port = process.env.URL || 3000;

app.listen(port, '0.0.0.0', function () {
    console.log(`app listening on port ${port}`)
});