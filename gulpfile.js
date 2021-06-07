//----------------------------------------------------------------------
//  mode
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  変数宣言
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

const $ = require("gulp-load-plugins")({
	pattern:[
		"gulp{-,.}*",   //  postcss,purgecss,imagemin,plumber,sass,sass-glob,notify,rename,clean-css,uglify

		"del","browser-sync","autoprefixer"
	]
});

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
	proxy: 'localhost:10020',
};

//----------------------------------------------------------------------
//  task処理
//----------------------------------------------------------------------
//  build
function build(done) {
		src(buildPath.sass.src)
		.pipe($.plumber())
		.pipe($.sassGlob())
		.pipe($.sass())
		.pipe(
			$.postcss([
				$.autoprefixer({
					cascade: false,
				}),
			])
		)
		.pipe(dest(buildPath.sass.dest))
	done();
};

//  browser-sync
function bs(done) {
	$.browserSync({
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
