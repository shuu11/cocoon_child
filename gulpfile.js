//----------------------------------------------------------------------
//  mode
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  変数宣言
//----------------------------------------------------------------------
const gulp = require("gulp");
const { series, parallel } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const autoprefixer = require("autoprefixer");
const loadPlugins = require("gulp-load-plugins");
const $ = loadPlugins(); //  postcss,purgecss,imagemin,plumber,sass,sass-glob,connect-php,notify,rename,clean-css,uglify,changed,diff-build

//  watch
const watchSrc = ["./**", "!./style.css"];

//  build
const build = {
	sass: {
		src: "./scss/**/*.scss",
		dest: `./`,
	},
};

//  browser-sync
const bs = {
	files: "./**/*.php",
	proxy: 10017,
};

//----------------------------------------------------------------------
//  task処理
//----------------------------------------------------------------------
//  build
gulp.task("build", function (done) {
	gulp
		.src(build.sass.src)
		.pipe($.diffBuild())
		.pipe($.plumber({ errorHandler: $.notify.onError("Error: <%= error.message %>") }))
		.pipe($.sassGlob())
		.pipe($.sass())
		.pipe(
			$.postcss([
				autoprefixer({
					cascade: false,
				}),
			])
		)
		.pipe(gulp.dest(build.sass.dest));
	done();
});

//  browser-sync
gulp.task("bs", function (done) {
	browserSync.init({
		notify: false,
		files: [bs.files],
		port: `${bs.proxy}`,
		proxy: `localhost:${bs.proxy}`,
		open: "external",
	});
	done();
});

gulp.task("bs-reload", function (done) {
	browserSync.reload();
	done();
});

//----------------------------------------------------------------------
//  watch処理
//----------------------------------------------------------------------
//  watch
gulp.task("dev:watch", function (done) {
	gulp.watch(watchSrc, gulp.series(parallel("build"), "bs-reload"));
});

//----------------------------------------------------------------------
//  default処理
//----------------------------------------------------------------------
gulp.task("dev:default", gulp.series(parallel("bs", "build"), "bs-reload", "dev:watch"));

/************************************************************************/
/*  END OF FILE                                       									*/
/************************************************************************/
