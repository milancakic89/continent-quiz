var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require("postcss-nested");
var cssImport = require('postcss-import');
var browserSync = require("browser-sync");


gulp.task("watch", function(){
browserSync.init({
    notify: false,
    server:{
        baseDir: "app"
    }
})

    watch('./app/index.html', function(){
        browserSync.reload()
    })
    watch("./app/assets/styles/**/*.css", function(){
        gulp.start('cssInject')
    })
})

gulp.task("cssInject", ["styles"], function(){
    return gulp.src("app/css/styles.css")
    .pipe(browserSync.stream())
})
gulp.task("styles", function(){
    return gulp.src("./app/assets/styles/styles.css")
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest("./app/css/"));
 })
 