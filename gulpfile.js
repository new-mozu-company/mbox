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
	Concatonates and minifies mbox-materialize JS files ORDER MATTERS!
	Output: dist/js/mbox-materialize.js && dist/js/mbox-materialize.min.js
*/
gulp.task('js', function(){
	return gulp.src([
			"js/mbox-materialize/initial.js",
			"js/mbox-materialize/jquery.easing.1.3.js",
			"js/mbox-materialize/animation.js",
			"js/mbox-materialize/velocity.min.js",
			"js/mbox-materialize/hammer.min.js",
			"js/mbox-materialize/jquery.hammer.js",
			"js/mbox-materialize/global.js",
			"js/mbox-materialize/collapsible.js",
			"js/mbox-materialize/dropdown.js",
			"js/mbox-materialize/leanModal.js",
			"js/mbox-materialize/materialbox.js",
			"js/mbox-materialize/parallax.js",
			"js/mbox-materialize/tabs.js",
			"js/mbox-materialize/tooltip.js",
			"js/mbox-materialize/waves.js",
			"js/mbox-materialize/toasts.js",
			"js/mbox-materialize/sideNav.js",
			"js/mbox-materialize/scrollspy.js",
			"js/mbox-materialize/forms.js",
			"js/mbox-materialize/slider.js",
			"js/mbox-materialize/cards.js",
			"js/mbox-materialize/chips.js",
			"js/mbox-materialize/pushpin.js",
			"js/mbox-materialize/buttons.js",
			"js/mbox-materialize/transitions.js",
			"js/mbox-materialize/scrollFire.js",
			"js/mbox-materialize/date_picker/picker.js",
			"js/mbox-materialize/date_picker/picker.date.js",
			"js/mbox-materialize/character_counter.js"])
		.pipe(concat('mbox-materialize.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('mbox-materialize.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['clean', 'js']);



