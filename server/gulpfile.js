var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var file = require('gulp-file');

gulp.task('server', ['package_json_run'], function() {
    var tsProject = ts.createProject("tsconfig.json");

    var tsResult = gulp.src(["src/**/*.ts", "typings/index.d.ts"])
    .pipe(plumber())
    .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('../dist'));
})

gulp.task('package_json_run', function() {
    var package_json = require("./package.json");
    delete package_json['devDependencies'];
    delete package_json['repository'];
    delete package_json['scripts'];

    return file('package.json', JSON.stringify(package_json, null, 2), {src: true})
    .pipe(gulp.dest('../dist'));
})

gulp.task("watch", ['server'], function() {
    gulp.watch("server/src/**/*.ts", ['server']);
});

gulp.task('default', ['server']);
