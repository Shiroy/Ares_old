import express = require('express');
import serve_static = require('serve-static');
import morgan = require('morgan');

let app = express();

app.use(morgan('dev'));

app.use(serve_static(__dirname + '/public', {
    index: ['index.html']
}));

app.listen(8080, function() {
    console.log("Server running on http://localhost:8080");
});
