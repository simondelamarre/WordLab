"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceWithParams = exports.distanceWithAxis = exports.distance = void 0;
exports.distance = function (a, b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
};
exports.distanceWithAxis = function (a, b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) +
        (a.y - b.y) * (a.y - b.y) +
        (a.z - b.z) * (a.z - b.z) +
        (a.rx - b.rx) * (a.rx - b.rx) +
        (a.ry - b.ry) * (a.ry - b.ry) +
        (a.rz - b.rz) * (a.rz - b.rz));
};
exports.distanceWithParams = function (a, b, request) {
    var x = (a.x - b.x) * (a.x - b.x);
    var y = (a.y - b.y) * (a.y - b.y);
    var z = (a.z - b.z) * (a.z - b.z);
    var rx = (a.rx - b.rx) * (a.rx - b.rx);
    var ry = (a.ry - b.ry) * (a.ry - b.ry);
    var rz = (a.rz - b.rz) * (a.rz - b.rz);
    if (!request.x)
        x = 0;
    if (!request.y)
        y = 0;
    if (!request.z)
        z = 0;
    if (!request.rx)
        rx = 0;
    if (!request.ry)
        ry = 0;
    if (!request.rz)
        rz = 0;
    return Math.sqrt(x + y + z + rx + ry + rz);
};
