const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const del = require('del');

gulp.task('javascript', () => {
    del('dist/js').then(() => gulp.src('src/js/gh-comments.js')
        .pipe(babel({presets: ['es2015']})).on('error', logAndEmit)
        .pipe(uglify()).on('error', logAndEmit)
        .pipe(gulp.dest('dist/js'))
    );
});

gulp.task('css', () => {
    del('dist/css').then(() => gulp.src('src/sass/gh-comments.scss')
        .pipe(sass()).on('error', logAndEmit)
        .pipe(cssmin()).on('error', logAndEmit)
        .pipe(gulp.dest('dist/css'))
    );
});

gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', ['javascript']);
    gulp.watch('src/sass/**/*.scss', ['css']);
});

gulp.task('default', ['javascript', 'css']);

// log and emit end (for restarting watch)
function logAndEmit(e) {
    console.log(e.toString());
    this.emit('end');
}
