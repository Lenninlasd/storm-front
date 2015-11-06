var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  rename = require("gulp-rename"),
  minifyCss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  streamqueue  = require('streamqueue'),
  bases = {
      app: '/',
      dist: './app/dist'
  };

gulp.task('sass', function () {
    'use strict';
    gulp.src('./app/src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('flugel.css'))
    .pipe(gulp.dest(bases.dist))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('flugel.min.css'))
    .pipe(gulp.dest(bases.dist));
});

gulp.task('sass:watch', function () {
    'use strict';
    gulp.watch('./app/src/**/*.scss', ['sass']);
});

gulp.task('minjs', function(){
    'use strict';
    return streamqueue({ objectMode: true },
        gulp.src('app/app.js'),
        gulp.src('app/src/**/*.js')
    )
    .pipe(concat('flugel.js'))
    // .pipe(gulp.dest(bases.dist))
  	// .pipe(uglify())
    // .pipe(rename('flugel.min.js'))
  	.pipe(gulp.dest(bases.dist));
});

gulp.task('minjs:watch', function () {
    'use strict';
    gulp.watch('./app/src/**/*.js', ['minjs']);
});

gulp.task('default', ['sass', 'minjs', 'sass:watch', 'minjs:watch']);
