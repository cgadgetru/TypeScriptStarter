var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['*.html'],
    typeScripts:'src/ts/*.ts',
    javaScripts:'dist/js/',
    srcRoot:'src',
    distRoot:'dist',
    typeScriptEntries:'src/ts/main.ts'
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.distRoot));
});

gulp.task("typeScripts",function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [paths.typeScriptEntries],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.javaScripts));
});

gulp.task('watch', function() {
    gulp.watch(paths.typeScripts, ['typeScripts']);
    gulp.watch(paths.pages, ['copy-html']);
});

gulp.task("default", ["watch"]);

