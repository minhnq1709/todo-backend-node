var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.js";
let Todo = class Todo {
    todo_id;
    user_id;
    title;
    description;
    status;
    due_date;
    priority;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Todo.prototype, "todo_id", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", String)
], Todo.prototype, "user_id", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 200,
        nullable: false
    }),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 2000,
        nullable: true,
    }),
    __metadata("design:type", String)
], Todo.prototype, "description", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 11,
        nullable: true
    }),
    __metadata("design:type", String)
], Todo.prototype, "status", void 0);
__decorate([
    Column({
        type: 'timestamptz',
        nullable: true
    }),
    __metadata("design:type", Date)
], Todo.prototype, "due_date", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 8,
        nullable: true
    }),
    __metadata("design:type", String)
], Todo.prototype, "priority", void 0);
__decorate([
    CreateDateColumn({
        type: 'timestamptz',
        default: () => 'now()'
    }),
    __metadata("design:type", Date)
], Todo.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'now()'
    }),
    __metadata("design:type", Date)
], Todo.prototype, "updated_at", void 0);
Todo = __decorate([
    Entity()
], Todo);
export { Todo };
//# sourceMappingURL=todo.js.map