//----------------------------------------------------------------------
//  mode
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  変数宣言
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const autoprefixer = require("autoprefixer");
const loadPlugins = require("gulp-load-plugins");
const $ = loadPlugins(); //  postcss,purgecss,imagemin,plumber,sass,sass-glob,connect-php,notify,rename,clean-css,uglify,changed,diff-build

//  watch
const watchSrc = ["./**", "!./*.css"];

//  build
const buildPath = {
	sass: {
		src: "./scss/**/*.scss",
		dest: `./`,
	},
};

//  browser-sync
const bsPath = {
	files: ["./**/*.scss","./**/*.php"],
	proxy: 'shuu11.wp',
};

//----------------------------------------------------------------------
//  task処理
//----------------------------------------------------------------------
//  build
function build(done) {
		src(buildPath.sass.src)
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
		.pipe(dest(buildPath.sass.dest))
		.pipe(browserSync.stream());
	done();
};

//  browser-sync
function bs(done) {
	browserSync({
    files: bsPath.files,
		port: 80,
		proxy : bsPath.proxy,
    notify: false,
		open: "external",
	});

	done();
}

//----------------------------------------------------------------------
//  watch処理
//----------------------------------------------------------------------
//  watch
function watchTask(done) {
	watch(watchSrc, series(build));
};

//----------------------------------------------------------------------
//  default処理
//----------------------------------------------------------------------
exports.default = series(build,bs,watchTask);
