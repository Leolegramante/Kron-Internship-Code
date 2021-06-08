"use strict";
/**
 * name - string
 * duration - number
 * educator - string
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CreateCoursesService = /** @class */ (function () {
    function CreateCoursesService() {
    }
    CreateCoursesService.prototype.execute = function (_a) {
        var name = _a.name, _b = _a.duration, duration = _b === void 0 ? 8 : _b, educator = _a.educator;
        console.log(name, duration, educator);
    };
    return CreateCoursesService;
}());
exports.default = new CreateCoursesService();
