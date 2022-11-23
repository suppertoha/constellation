const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');

// Code

function code() {
    return src('app/*.html')
        .pipe(browserSync.stream())
}
exports.html = code

// Style

function style() {
    return src('app/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}
exports.css = style

// Watch

function watchFiles() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        // server: true,
        notify: false
    })

    watch('app/*.html', code)
    watch('app/scss/**/*.scss', style)
    watch('app/js/**/*.js').on('change', browserSync.reload);
}
exports.watch = watchFiles

// Exports

exports.default = series(
    parallel(code, style),
    watchFiles
)