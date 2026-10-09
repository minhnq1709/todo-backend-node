var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
let User = class User {
    user_id;
    email;
    password_hash;
    is_verified;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: 'char',
        length: 60,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    Column({
        type: 'boolean',
        nullable: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "is_verified", void 0);
__decorate([
    Column({
        type: 'timestamptz',
        default: () => 'now()'
    }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
User = __decorate([
    Entity('users')
], User);
export { User };
//# sourceMappingURL=user.js.map