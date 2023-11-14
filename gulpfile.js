const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();
const gulpif = require("gulp-if");
const concat = require("gulp-concat");
const replace = require("gulp-replace");

// Paths
const paths = {
  src: {
    html: "source/*.html",
    styles: "source/less/style.less",
    fonts: "source/fonts/*.{woff2,woff}",
    images: "source/img/**/*.{png,jpg,svg}",
    js: "source/js/app.js",
    favicon: "source/*.ico",
    svgIcons: "source/img/icons/*.svg"
  },
  dest: {
    folder: "build/",
    styles: "build/css/",
    fonts: "build/fonts/",
    images: "build/img/",
    js: "build/js/",
    sprite: "build/img/"
  },
};

// Styles
const styles = () => {
  return gulp.src(paths.src.styles)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(replace(/\.(png|jpg)/g, '.webp')) // заменяем расширения png и jpg на webp
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest(paths.dest.styles))
    .pipe(sync.stream());
};

// HTML
const html = () => {
  return gulp.src(paths.src.html)
    .pipe(replace(/\.(png|jpg)/g, '.webp')) // заменяем расширения png и jpg на webp
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dest.folder));
};

// Scripts
const scripts = () => {
  return gulp.src(paths.src.js)
    .pipe(plumber())
    .pipe(concat("app.js")) // Объединение всех файлов в один
    .pipe(terser())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest(paths.dest.js))
    .pipe(sync.stream());
};

// Images
const optimizeImages = () => {
  return gulp.src(paths.src.images)
    .pipe(webp())
    .pipe(gulp.dest(paths.dest.images));
};

const copyImages = () => {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dest.images));
};

// WebP
const createWebp = () => {
  return gulp.src(paths.src.images)
    .pipe(gulpif(['**/*.png', '**/*.jpg'], webp({ quality: 90 })))
    .pipe(gulp.dest(paths.dest.images));
};

// Sprite
const sprite = () => {
  return gulp.src(paths.src.svgIcons)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(paths.dest.sprite));
};

// Copy
const copy = (done) => {
  gulp.src([
    paths.src.fonts,
    paths.src.favicon,
    paths.src.svgIcons,
  ], { base: "source" })
    .pipe(gulp.dest(paths.dest.folder));
  done();
};

// Clean
const clean = () => {
  return del(paths.dest.folder);
};

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: paths.dest.folder
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload
const reload = (done) => {
  sync.reload();
  done();
};

// Watcher
const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch(paths.src.html, gulp.series(html, reload));
  gulp.watch(paths.src.images, gulp.series(optimizeImages, copyImages, createWebp, reload));
  gulp.watch(paths.src.js, gulp.series(scripts));
  gulp.watch(paths.src.svgIcons, gulp.series(sprite, reload));
};

// Build
const build = gulp.series(
  clean,
  copy,
  gulp.parallel(styles, html, scripts, optimizeImages, sprite, createWebp),
);

// Default
exports.default = gulp.series(build, server, watcher);
