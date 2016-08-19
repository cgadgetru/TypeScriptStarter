var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var concat = require('gulp-concat');
var tslint = require('gulp-tslint');

var vendors = '/vendors';
var paths = {
    pages: ['*.html'],
    typeScripts: 'src/ts/*.ts',
    javaScripts: 'dist/js/',
    srcRoot: 'src',
    distRoot: 'dist',
    typeScriptEntries: 'src/ts/main.ts',
    vendorsPaths: {
        js: [
            'node_modules/jquery/tmp/jquery.js',
            'node_modules/owl.carousel/dist/owl.carousel.min.js'
        ],
        css: [
            'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
            'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css'
        ],
        img: [
            'node_modules/owl.carousel/dist/assets/ajax-loader.gif',
            'node_modules/owl.carousel/dist/assets/owl.video.play.png'
        ]
    }
};

gulp.task('vendors-css', function () {
    if (paths.vendorsPaths.css.length > 0) {
        gulp.src(paths.vendorsPaths.css)
            .pipe(concat('vendor.min.css'))
            .pipe(gulp.dest(paths.distRoot + vendors));
    }

});

gulp.task('vendors-img', function () {
    if (paths.vendorsPaths.css.length > 0) {
        gulp.src(paths.vendorsPaths.img)
            .pipe(gulp.dest(paths.distRoot + vendors));
    }

});

gulp.task('vendors-js', function () {
    if (paths.vendorsPaths.js.length > 0) {
        gulp.src(paths.vendorsPaths.js)
            .pipe(concat('vendors.min.js'))
            .pipe(gulp.dest(paths.distRoot + vendors));
    }
});

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.distRoot));
});

gulp.task('typeScripts', function () {
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

gulp.task('tslint', function () {
    gulp.src(paths.typeScripts)
        .pipe(tslint({
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }))
});

gulp.task('watch', function () {
    gulp.watch(paths.typeScripts, ['typeScripts','tslint']);
    gulp.watch(paths.pages, ['copy-html']);
});

gulp.task('build',['tslint', 'typeScripts', 'copy-html', 'vendors-css', 'vendors-js', 'vendors-img'])

gulp.task('default', ['build', 'watch']);

