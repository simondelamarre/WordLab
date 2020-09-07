var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

gulp.task("default", function () {
    return browserify({
        //basedir: '.',
        debug: true,
        entries: ['src/index.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle3.js'))
        .pipe(gulp.dest("dist"));
});

/* var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
gulp.task("default", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});
gulp.task('transpile', function () {
    return browserify({
        entries: [
            'dist/index.js'
        ]
    })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .transform('babelify')
        .bundle()
        .pipe(source('dist/index.js'))
        .pipe(gulp.dest('dist/'));
}); */

/* gulp.task("default", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
}); */

/* var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require("babelify");
var watch = require('gulp-watch');

gulp.task('make:game', function () {
    return browserify({
        entries: [
            'src/index.ts'
        ]
    })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .transform('babelify')
        .bundle()
        .pipe(source('src/index.ts'))
        .pipe(gulp.dest('app/'));
}); */