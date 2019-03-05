var gulp = require('gulp'),  
  pug = require('gulp-pug');

// run this task by typing in gulp pug in CLI
gulp.task('pug', function() {  
  return gulp.src('*.pug')
      .pipe(pug({ pretty:true })) // pipe to pug plugin
      .pipe(gulp.dest('build')); // tell gulp our output folder
});

gulp.task('watch', function(){
    gulp.watch('*.pug', gulp.series('pug'));
});