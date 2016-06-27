var gulp = require("gulp");
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var pug = require("gulp-pug");

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
    gulp.src("node_modules/phaser/dist/*.js")
    .pipe(gulp.dest("dist/public"));
})

gulp.task('client', ['client_asset', 'client_html', 'phaser'], function() {
    var tsProject = ts.createProject("client/tsconfig.json");

    var tsResult = tsProject.src()
        .pipe(ts(tsProject))
        .pipe(browserify({
            insertGlobals:false,
            debug: !gulp.env.production
        }))
        .on('prebundle', function(bundle) {
            bundle.external('phaser');
        })
        .pipe(rename('ares.js'))
        .pipe(gulp.dest('dist/public'));
})

gulp.task('server', function() {

})

gulp.task('default', ['client', 'server']);
