var gulp = require("gulp");
var rimraf = require("gulp-rimraf");
var shell = require('gulp-shell');
var fs = require('fs');
var runSequence = require('run-sequence');

gulp.task('client', ['clean'], shell.task(['gulp client'], {
    cwd: './client'
}));

gulp.task('server', ['clean'], shell.task(['gulp server'], {
    cwd: './server'
}));

gulp.task('dep_client', shell.task(['npm i'], {
    cwd: './client'
}));

gulp.task('dep_server', shell.task(['npm i'], {
    cwd: './server'
}));

gulp.task('build_dep', ['dep_client', 'dep_server']);

gulp.task('clean', function() {
    try {
        fs.accessSync('./dist');
    }catch(e){
        return;
    }

    var files = ["./dist/public", "./dist/util", "./dist/*.js", "./dist/package.json"];

    return gulp.src(files, { read: false })
    .pipe(rimraf());
})

gulp.task('runtime_dep', shell.task(['npm i'], {
    cwd: './dist'
}));

gulp.task('default', ['client', 'server']);

gulp.task('full_build', function(cb){
    runSequence('build_dep', 'runtime_dep', cb);
})
