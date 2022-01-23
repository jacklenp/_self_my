const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('style', function () {
    return gulp.src("./sass/*.+(sass|scss)")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    gulp.watch("./sass/*.+(sass|scss)", gulp.parallel('style'));
    gulp.watch("./js/*.js").on("change", browserSync.reload);
    // gulp.watch("*.js").on("change", reload)
    gulp.watch("./*.html").on("change", browserSync.reload);
});

gulp.task("default", gulp.parallel('watch', 'server', 'style'));