const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const typedoc = require("gulp-typedoc");
const { writeFile } = require("fs");

const build = function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
}; // close build

const watch = gulp.series(build, function watching() {
    gulp.watch("./src/**/*.ts", build);
});

const docs = gulp.series([function GenerateTypeDoc() {
    return gulp
        .src([
            "src/**/*.ts",
            "!src/**/*.test.ts"
        ])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            out: "docs/",
            name: "Image Generator"
        }));
}, function addNoJekyllFile() {
    return new Promise((resolve, reject) => {
        writeFile("./docs/.nojekyll", ".nojekyll", (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}]); // close docs

exports.watch = watch;
exports.build = build;
exports.docs = docs;
exports.default = build;
