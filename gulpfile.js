var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('gulp_nodemon', function () {
    nodemon({
        script: './bin/www', //this is where my express server is
        ext: 'js html sass', //nodemon watches *.js, *.html and *.sass files
        env: {
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('sync', function () {
    browserSync.init({
        proxy: 'http://localhost:3001/', //this is the port where express server works
        reloadDelay: 1000 //Important, otherwise syncing will not work
    });
    gulp.watch(['./**/*.js', './**/*.html', './**/*.sass']).on("change", browserSync.reload);
});

gulp.task('default', gulp.series('gulp_nodemon', 'sync'));