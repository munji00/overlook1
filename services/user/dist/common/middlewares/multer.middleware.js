"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterMiddleware = void 0;
const common_1 = require("@nestjs/common");
const multer = require("multer");
const path = require("path");
let MulterMiddleware = class MulterMiddleware {
    constructor() {
        this.multer = multer({
            storage: multer.diskStorage({
                destination: 'src/uploads/',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const extension = path.extname(file.originalname);
                    const modifiedFileName = file.fieldname + '-' + uniqueSuffix + extension;
                    cb(null, modifiedFileName);
                }
            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    cb(null, true);
                }
                else {
                    cb(new common_1.HttpException(`Unsupported file type ${path.extname(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
                }
            },
        });
    }
    use(req, res, next) {
        this.multer.single('profile')(req, res, next);
    }
};
exports.MulterMiddleware = MulterMiddleware;
exports.MulterMiddleware = MulterMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MulterMiddleware);
//# sourceMappingURL=multer.middleware.js.map