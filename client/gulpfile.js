var gulp = require("gulp");
var ts = require('gulp-typescript');
var pug = require("gulp-pug");
var webpack = require("gulp-webpack");
var plumber = require("gulp-plumber");
var livereload = require("gulp-livereload");

gulp.task('client_asset', function() {
    return gulp.src('assets/**/*', {base:'assets'})
    .pipe(gulp.dest('../dist/public'));
})

gulp.task('client_html', function() {
    return gulp.src("src/index.jade")
    .pipe(pug({
        pretty: '    '
    }))
    .pipe(gulp.dest('../dist/public'))
})

gulp.task('socket-io-client', function(){
    return gulp.src("node_modules/socket.io-client/socket.io.js")
    .pipe(gulp.dest("../dist/public"));
})

gulp.task('phaser', function() {
    return gulp.src("node_modules/phaser/build/phaser.js")
    .pipe(gulp.dest("../dist/public"));
})

gulp.task('bootstrap', function() {
    return gulp.src("node_modules/bootstrap/dist/**/*")
    .pipe(gulp.dest("../dist/public"));
})

gulp.task('jquery', function() {
    return gulp.src("node_modules/jquery/dist/**/*")
    .pipe(gulp.dest("../dist/public/js/"));
})


gulp.task('client', ['client_asset', 'client_html', 'phaser', 'socket-io-client', 'client_typescript', 'bootstrap', 'jquery'])

gulp.task('client_typescript', function() {

    return gulp.src("src/index.ts")
    .pipe(plumber())
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("../dist/public"))
    .pipe(livereload());
})

gulp.task("watch", ['client'], function() {
    livereload.listen()
    gulp.watch("client/src/**/*", ['client_typescript']);
});

gulp.task('default', ['client']);
