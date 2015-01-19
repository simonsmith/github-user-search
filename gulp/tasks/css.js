var gulp        =   require('gulp');
var rework =        require('gulp-rework');
var rename =        require('gulp-rename');
var autoprefixer =  require('gulp-autoprefixer');
var path =          require('path');
var reworkSuit =    require('rework-suit');

var paths =         require('../util/paths');
var handleError =   require('../util/handleError');

gulp.task('suit', function() {
  return gulp.src(path.join(paths.css.cssDir, paths.css.mainFile))
    .pipe(rework(reworkSuit()).on('error', handleError))
    .pipe(autoprefixer())
    .pipe(rename(paths.css.builtFile))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('css', ['suit']);
