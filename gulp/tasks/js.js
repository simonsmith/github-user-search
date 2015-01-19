var gulp =        require('gulp');
var webpack =     require('gulp-webpack');
var paths =       require('../util/paths');
var config =      require('../config/webpack.config.js');

gulp.task('js', function() {
  return gulp.src(paths.js.src)
    .pipe(webpack(config))
    .pipe(gulp.dest(paths.js.dest));
});