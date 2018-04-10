//删除文件与文件夹



// var gulp = require('gulp');
// var del = require('del');
//
// gulp.task('clean:mobile', function(cb) {
//     // 将你的默认的任务代码放在这
//     del([
//         'dist/report.csv',
//         // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
//         'dist/mobile/**/*',
//         // 我们不希望删掉这个文件，所以我们取反这个匹配模式
//         '!dist/mobile/deploy.json'
//     ], cb);
// });
// gulp.task('default', ['clean:mobile']);



// 在管道中删除文件
// var gulp = require('gulp');
// var stripDebug = require('gulp-strip-debug'); // 仅用于本例做演示
// var del = require('del');
// var vinylPaths = require('vinyl-paths');
// gulp.task('clean:tmp', function () {
//     return gulp.src('tmp/*')
//         .pipe(stripDebug())
//         .pipe(gulp.dest('dist'))
//         .pipe(vinylPaths(del));
// });
//
// gulp.task('default', ['clean:tmp']);
// 同时输出一个压缩过和一个未压缩版本的文件
'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var DEST = 'src/';

gulp.task('default', function() {
    return gulp.src('foo.js')
    // 这会输出一个未压缩过的版本
        .pipe(gulp.dest(DEST))
        // 这会输出一个压缩过的并且重命名未 foo.min.js 的文件
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(DEST));
});