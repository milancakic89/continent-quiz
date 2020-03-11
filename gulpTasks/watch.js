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

    gulp.task("cssInject", ["styles"], function(){
        return gulp.src("app/css/styles.css")
        .pipe(browserSync.stream())
    })
    
    gulp.task('scriptsRefresh', function(){
        gulp.start('scripts');
        setTimeout(() => {
            browserSync.reload();
        }, 2000);

    })