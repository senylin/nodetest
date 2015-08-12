var gulp = require('gulp'),
uglify = require('gulp-uglify');

gulp.task('default',function(){
	gulp.src('src/a*.js',{base:''})
	.pipe(gulp.dest('dist'));
});
//gulp.watch('src/*.js',funtion(event){
//console.log(event.type);
//console.log(event.path);
//});