"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRoute = void 0;
var express_1 = require("express");
var user_service_1 = require("../services/user.service");
function getUserRoute(dataSource) {
    var router = express_1.Router();
    var userService = new user_service_1.UserService(dataSource);
    router.get('/listAll', userService.getAll);
    router.post('/create', userService.createUser);
    router.post('/delete', userService.deleteUserById);
    return router;
}
exports.getUserRoute = getUserRoute;
//# sourceMappingURL=user.route.js.map