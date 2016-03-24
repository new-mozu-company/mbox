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
	Concatonates and minifies mbox-materialize JS files
	Output: dist/js/mbox-materialize.js && dist/js/mbox-materialize.min.js
*/
gulp.task('js', function(){
	return gulp.src('js/mbox-materialize/**/*.js')
		.pipe(concat('mbox-materialize.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('mbox-materialize.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['clean', 'js']);



