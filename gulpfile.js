var gulp = require('gulp');

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var minifyCss = require('gulp-minify-css');

gulp.task('default', ['sass', 'sass:watch']);

gulp.task('sass', function () {
    'use strict';
    gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('flugel.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('flugel.min.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass:watch', function () {
    'use strict';
    gulp.watch('./sass/**/*.scss', ['sass']);
});
