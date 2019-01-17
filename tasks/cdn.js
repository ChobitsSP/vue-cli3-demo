const gulp = require('gulp');
const ftp = require('vinyl-ftp');
const logger = require('gulplog');

function FtpStatic() {
  const remotePath = '/h5Static/ndc-airport'
  const config = {
    host: '127.0.0.1',
    user: 'administrator',
    password: '123456',
    parallel: 10,
    log: logger.info.bind(logger)
  };
  const globs = ['dist/static/**/*'];
  const conn = ftp.create(config);

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp.src(globs, {
      base: 'dist',
      buffer: false
    })
    .pipe(conn.filter(remotePath, function (localFile, remoteFile, callback) {
      // localFile and remoteFile are vinyl files.
      // Check remoteFile.ftp for remote information.
      // Decide wether localFile should be emitted and call callback with boolean.
      // callback is a function( error, emit )
      callback(null, !remoteFile)
    }))
    //.pipe(conn.newer('')) // only upload newer files
    .pipe(conn.dest(remotePath));
}

function FtpIndex() {
  const remotePath = '/h5Static/ndc-airport'
  const config = {
    host: '127.0.0.1',
    user: 'administrator',
    password: '123456',
    parallel: 10,
    log: logger.info.bind(logger)
  };
  const globs = ['dist/index.html'];
  const conn = ftp.create(config);

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp.src(globs, {
      base: 'dist',
      buffer: false
    })
    //.pipe(conn.newer('')) // only upload newer files
    .pipe(conn.dest(remotePath));
}

gulp.task('cdn', gulp.series(FtpStatic, FtpIndex)); //序列执行