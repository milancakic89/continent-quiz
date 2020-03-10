const gulp = require("gulp");
const watch = require("gulp-watch");
const browserSync = require("browser-sync");

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
        watch("./app/assets/js/**/*.js", function(){
            gulp.start('scriptsRefresh');
        })
    })

    gulp.task('scriptsRefresh', function(){
        browserSync.reload();
    })