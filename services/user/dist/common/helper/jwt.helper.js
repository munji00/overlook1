"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const secretKey = process.env.JWT_SECRET;
exports.jwtHelper = {
    async generateToken(data) {
        return await jwt.sign(data, secretKey);
    },
    async verifyToken(token) {
        return jwt.verify(token, secretKey);
    }
};
//# sourceMappingURL=jwt.helper.js.map