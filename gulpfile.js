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
	pattern: [
		"gulp{-,.}*", //  autoprefixer,plumber,dartSass

		"browser-sync",
	],
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
	files: watchSrc,
	proxy: "localhost:10020",
};

//----------------------------------------------------------------------
//  task処理
//----------------------------------------------------------------------
function build(done) {
	src(buildPath.sass.src)
		.pipe($.plumber())
		.pipe($.dartSass())
		.pipe($.autoprefixer())
		.pipe(dest(buildPath.sass.dest));

	done();
}

function bs(done) {
	$.browserSync({
		files: bsPath.files,
		port: 80,
		proxy: bsPath.proxy,
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
}

//----------------------------------------------------------------------
//  default処理
//----------------------------------------------------------------------
exports.default = series(build, bs, watchTask);


/************************************************************************/
/*  END OF FILE                                                         */
/************************************************************************/
