var gulp = require('gulp')

    clean = require('gulp-clean')
    sass = require('gulp-sass')
    concat = require('gulp-concat')
    rename = require("gulp-rename")
    minifyCss = require('gulp-minify-css')
    gulpFilter = require('gulp-filter')
    bowerFiles = require('main-bower-files')
    order = require('gulp-order')
    htmlhint = require('gulp-htmlhint')
    htmlmin = require('gulp-htmlmin')
    ngHtml2js =require('gulp-html2js')
    uglify = require('gulp-uglify');

    var bases = {
      app: '/',
      partials: ['app/**/*.html', '!app/index.html'],
      scripts: './app/**/**/*.js',
      dist: './appmin/dist/'
    };

    //Tarea para Limpiar el Directorio dist
    gulp.task('clean', function(){
        	gulp.src(bases.dist)
        	.pipe(clean());
    });

    //Tarea para minificar js files de la app

    gulp.task('appminjs', ['clean'], function(){

      gulp.src(bases.scripts)
    	.pipe(uglify())
      .pipe(concat('app.min.js'))
    	.pipe(gulp.dest(bases.dist + 'scripts'));
    });

    gulp.task('templates', ['clean'], function(){

      gulp.src(bases.partials)
      .pipe(htmlhint.failReporter())
      .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(ngHtml2js({
          moduleName: "healthyGulpAngularApp"
      }))
      .pipe(uglify())
      .pipe(concat('templates.js'))
      .pipe(gulp.dest(bases.dist + 'scripts'));
    });

    gulp.task('vendorjsmin', ['clean'], function(){

      var jsFilter = gulpFilter('**/*.js')
          gulp.src(bowerFiles())
          .pipe(order(['jquery.js', 'angular.js']))
          .pipe(jsFilter)
          .pipe(uglify())
          .pipe(concat('vendor.min.js'))
          .pipe(gulp.dest(bases.dist + 'scripts'))

    });

    gulp.task('vendorstylemin', ['clean'], function(){

      var cssFilter = gulpFilter('**/*.css')
          gulp.src(bowerFiles())
           .pipe(cssFilter)
           .pipe(minifyCss())
           .pipe(concat('vendor.min.css'))
           .pipe(gulp.dest(bases.dist + 'styles'))

    });


    gulp.task('sass', ['clean'], function () {
        'use strict';
        gulp.src('./app/src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('flugel.css'))
        .pipe(gulp.dest(bases.dist + 'styles'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename('flugel.min.css'))
        .pipe(gulp.dest(bases.dist + 'styles'));
    });

    gulp.task('sass:watch', function () {
        'use strict';
        gulp.watch('./app/src/**/*.scss', ['sass']);
    });

    gulp.task('default', ['clean','sass', 'appminjs', 'vendorjsmin', 'vendorstylemin', 'templates']);
