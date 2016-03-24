'use strict';

var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		del = require('del');

/*
	Deletes dist directory
*/
gulp.task('clean', function(cb){
	del(['dist'], cb);
});


/*
	Concatonates and minifies JS files
	Output: dist/js/mbox.js && dist/js/mbox.min.js
*/
gulp.task('js', function(){
	return gulp.src('js/**/*.js')
		.pipe(concat('mbox.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('mbox.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['clean', 'js']);



