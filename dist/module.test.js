"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = __importDefault(require("./module"));
const canvas_1 = require("canvas");
const fs_1 = require("fs");
function getImageDimensions(src) {
    return new Promise((resolve, reject) => {
        var i = new canvas_1.Image();
        i.onload = function () {
            resolve({
                width: i.width,
                height: i.height
            });
        };
        i.onerror = function (error) {
            reject(error);
        };
        i.src = src;
    });
}
; // close getImageDimensions
afterAll(() => {
    const snaps = require("./__snapshots__/module.test.ts.snap");
    let body = "";
    for (let [key, value] of Object.entries(snaps)) {
        body += `<div class="card mb-4">
            <div class="card-header">${key}</div>
            <div class="card-body">
                <img src=${value} alt="${key}" />
            </div>
        </div>`;
    }
    // console.log(snaps);
    return new Promise((resolve, reject) => {
        fs_1.writeFile("./demo.html", `
            <html>
                <head>
                    <title>Generated Image Results</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="jumbotron">
                                    <h1 class="display-4">Generated Image Results</h1>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                ${body}
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
});
describe("defaultImage", () => {
    test("that a string gets returned from defaultImage", () => {
        expect(module_1.default("Test String")).toMatch(new RegExp("^data:image/png;base64,[a-zA-Z0-9-+/_]{8,}={0,}$"));
    });
    test("to match a snapshot", () => {
        expect(module_1.default("Test String")).toMatchSnapshot();
    });
    test("with nothing passed to match a snapshot", () => {
        expect(module_1.default()).toMatchSnapshot();
    });
    describe("text values", () => {
        test("defaults to image size", () => {
            expect(module_1.default(null, {
                width: 728,
                height: 90
            })).toMatchSnapshot();
        });
        test("wraps multiple lines", () => {
            expect(module_1.default("Expect this text to Wrap onto multiple lines", {
                width: 300,
                height: 300
            })).toMatchSnapshot();
        });
    });
    describe("configuration", () => {
        test("width", () => {
            const thisAsset = module_1.default("test", {
                width: 100
            });
            expect(thisAsset).toMatchSnapshot();
            return getImageDimensions(thisAsset).then(result => {
                expect(result.width).toEqual(100);
            });
        });
        test("height", () => {
            const thisAsset = module_1.default("test", {
                height: 100
            });
            expect(thisAsset).toMatchSnapshot();
            return getImageDimensions(thisAsset).then(result => {
                expect(result.height).toEqual(100);
            });
        });
        test("width and height", () => {
            const thisAsset = module_1.default("test", {
                width: 100,
                height: 100
            });
            expect(thisAsset).toMatchSnapshot();
            return getImageDimensions(thisAsset).then(result => {
                expect(result.width).toEqual(100);
                expect(result.height).toEqual(100);
            });
        });
        test("fontSize", () => {
            expect(module_1.default("test", {
                fontSize: 60
            })).toMatchSnapshot();
        });
        test("font", () => {
            expect(module_1.default("test", {
                font: "Courier"
            })).toMatchSnapshot();
        });
        test("textColor", () => {
            expect(module_1.default("test", {
                textColor: "#f00"
            })).toMatchSnapshot();
        });
        test("fillColor as String", () => {
            expect(module_1.default("test", {
                fillColor: "#f00"
            })).toMatchSnapshot();
        });
        test("fillColor as Array", () => {
            expect(module_1.default("test", {
                fillColor: ["#f00", "#0f0"]
            })).toMatchSnapshot();
        });
        test("gradientType: linear", () => {
            expect(module_1.default("test", {
                fillColor: ["#f00", "#0f0"],
                gradientType: "linear"
            })).toMatchSnapshot();
        });
        test("gradientType: radial", () => {
            expect(module_1.default("test", {
                fillColor: ["#f00", "#0f0", "#00f"],
                gradientType: "radial"
            })).toMatchSnapshot();
        });
        test("borderColor", () => {
            expect(module_1.default("test", {
                borderColor: "#f00"
            })).toMatchSnapshot();
        });
        test("borderWidth", () => {
            expect(module_1.default("test", {
                borderWidth: 10
            })).toMatchSnapshot();
        });
    }); // close describe("configuration")
}); // close describe("defaultImage")
