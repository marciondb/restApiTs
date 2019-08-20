/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'
import * as bcrypt from 'bcryptjs'

/**
* @swagger
* definitions:
*  User:
*    type: object
*    properties:
*      id:
*        type: integer
*        format: int64
*      email:
*        type: string
*      name:
*        type: string
*      password:
*        type: string
*      state_id:
*        type: integer
*        format: int64
*        description: User State Id
*    xml:
*      name: User
*  Login:
*    type: object
*    properties:
*      email:
*        type: string
*      password:
*        type: string
*    xml:
*      name: Login
*  ApiResponse:
*    type: object
*    properties:
*      code:
*        type: integer
*        format: int32
*      type:
*        type: string
*      message:
*        type: string
*/
@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 45)
    name: string;

    @Column()
    @IsNotEmpty()
    state_id: number;

    @Column()
    @Length(4, 255)
    password: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 45)
    email: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword (): void {
      this.password = bcrypt.hashSync(this.password, 10)
    }

    checkIfUnEncryptedPasswordIsValid (unEncryptedPassword: string): boolean {
      return bcrypt.compareSync(unEncryptedPassword, this.password)
    }
}
