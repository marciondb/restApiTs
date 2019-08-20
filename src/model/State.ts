/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'

/**
* @swagger
* definitions:
*  State:
*    type: object
*    properties:
*      id:
*        type: integer
*        format: int64
*      name:
*        type: string
*    xml:
*      name: State
*/
@Entity()
export class State {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 45)
    name: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}
