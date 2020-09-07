"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearestNeighbors = void 0;
var distance_1 = require("./distance");
exports.NearestNeighbors = function (point, target, request) {
    var distances = [];
    for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
        var item = target_1[_i];
        item.weight = distance_1.distanceWithParams(point, item.pos, {
            x: request.x,
            y: request.y,
            z: request.z,
            rx: request.rx,
            ry: request.ry,
            rz: request.rz,
        });
        distances.push(item);
    }
    return distances.sort(function (a, b) { return a.weight - b.weight; });
};
