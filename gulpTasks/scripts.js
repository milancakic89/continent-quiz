const gulp = require('gulp');
const webpack = require('webpack');

gulp.task('scripts', function(callback){
    webpack(require('./../webpack.config'), function(){
        callback()
    });
})
