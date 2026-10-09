import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.js";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    todo_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true,
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 11,
        nullable: true
    })
    status: 'TODO' | 'IN-PROGRESS' | 'DONE';

    @Column({
        type: 'timestamptz',
        nullable: true
    })
    due_date: Date;

    @Column({
        type: 'varchar',
        length: 8,
        nullable: true
    })
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'now()'
    })
    created_at: Date;

    @UpdateDateColumn(
        {
            type: 'timestamptz',
            default: () => 'now()'
        }
    )
    updated_at: Date;
}