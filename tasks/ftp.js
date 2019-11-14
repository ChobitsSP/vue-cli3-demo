const gulp = require("gulp");

const { CreateFtpGulp } = require("./utils.js");

gulp.task(
  "ftp",
  CreateFtpGulp(
    {
      host: "127.0.0.1",
      user: "ftp_user",
      password: "123456",
      port: 21,
      parallel: 1
    },
    "/website1"
  )
);
