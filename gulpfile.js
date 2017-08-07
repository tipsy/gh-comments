const autoprefixer = require('autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cssmin = require('gulp-cssmin');
const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const uglify = require('gulp-uglify');

gulp.task('javascript', () => {
    del('dist/js').then(() => gulp.src('src/js/index.js')
        .pipe(plumber())
        .pipe(tap((file) => {
            file.contents = browserify(file.path, {})
                .transform(babelify, {presets: ['es2015']})
                .bundle();
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename('gh-comments.js'))
        .pipe(gulp.dest('dist/js'))
    );
});

gulp.task('css', () => {
    del('dist/css').then(() => gulp.src('src/sass/gh-comments.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({browsers: ['last 1 version']}),
        ]))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
    );
});

gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', ['javascript']);
    gulp.watch('src/sass/**/*.scss', ['css']);
});

gulp.task('default', ['javascript', 'css']);
