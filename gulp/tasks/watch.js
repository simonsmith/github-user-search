var gulp  = require('gulp');
var paths = require('../util/paths');
var path = require('path');

gulp.task('watch', function() {
  gulp.watch(path.join(paths.css.cssDir, '/**/*.css'), ['css']);
  gulp.watch(path.join(paths.js.jsDir, '**/*'), ['js']);
});
