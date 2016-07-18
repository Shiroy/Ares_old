var gulp = require("gulp");
var ts = require("gulp-typescript");
var plumber = require("gulp-plumber");

gulp.task('protocol', function(){
    var tsProject = ts.createProject("tsconfig.json");

    var tsResult = tsProject.src()
    .pipe(plumber())
    .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('.'));
});

gulp.task('default', ['protocol']);
