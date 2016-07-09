var gulp = require("gulp");
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var pug = require("gulp-pug");
var webpack = require("gulp-webpack");

gulp.task('client_asset', function() {
    return gulp.src('client/assets/**/*', {base:'client'})
    .pipe(gulp.dest('dist/public'));
})

gulp.task('client_html', function() {
    return gulp.src("client/src/index.jade")
    .pipe(pug({
        pretty: '    '
    }))
    .pipe(gulp.dest('dist/public'))
})

gulp.task('phaser', function() {
    gulp.src("node_modules/phaser/build/phaser.js")
    .pipe(gulp.dest("dist/public"));
})

gulp.task('client', ['client_asset', 'client_html', 'phaser'], function() {
    return gulp.src("client/src/index.ts")
    .pipe(webpack(require("./client/webpack.config.js")))
    .pipe(rename('ares.js'))
    .pipe(gulp.dest("dist/public"));

})

gulp.task('server', function() {
    var tsProject = ts.createProject("server/tsconfig.json");

    return gulp.src(['server/src/**/*.ts', 'typings/index.d.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest("dist"));
})

gulp.task('default', ['client', 'server']);
