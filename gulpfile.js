var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require("postcss-nested");
var cssImport = require('postcss-import');
var browserSync = require("browser-sync");

gulp.task("default", function(){
    console.log("hooray - you just created a gulp task");
});
gulp.task("html", function(){
    console.log('something great just happened');
})
gulp.task("styles", function(){
   return gulp.src("./app/assets/styles/styles.css")
   .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
   .pipe(gulp.dest("./app/temp/styles"));
})


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
    watch('./app/new-portfolio.html', function(){
        browserSync.reload()
    })
    watch('./app/contact.html', function(){
        browserSync.reload()
    })
    watch('./app/portfolio.html', function(){
        browserSync.reload()
    })
    watch("./app/assets/styles/**/*.css", function(){
        gulp.start('cssInject')
    })
})

gulp.task("cssInject", ["styles"], function(){
    return gulp.src("app/temp/styles/styles.css")
    .pipe(browserSync.stream())
})