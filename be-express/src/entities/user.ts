import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: 'char',
        length: 60,
        nullable: false,
    })
    password_hash: string;

    @Column({
        type: 'boolean',
        nullable: false
    })
    is_verified: boolean;

    @Column({
        type: 'timestamptz',
        default: () => 'now()'
    })
    created_at: Date;
}