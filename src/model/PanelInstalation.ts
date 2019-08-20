/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToOne, JoinColumn
} from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'

import { State } from './State'
import { DataProvider } from './DataProvider'

/**
* @swagger
* definitions:
*  User:
*    type: object
*    properties:
*      id:
*        type: integer
*        format: int64
*      data_provider_id:
*        type: integer
*        format: int64
*        description: Panel Installation Data Provider Id
*      installation_date:
*        type: date
*      system_size:
*        type: decimal
*      zipcode:
*        type: integer
*      state_id:
*        type: integer
*        format: int64
*        description: Panel Installation State Id
*      cost:
*        type: decimal
*    xml:
*      name: PanelInstallation
*/
@Entity()
export class PanelInstallation {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ unsigned: true })
    @IsNotEmpty()
    @OneToOne(() => DataProvider)
    @JoinColumn({ name: 'data_provider_id' })
    data_provider_id: number;

    @Column({ name: 'installation_date' })
    @IsNotEmpty()
    @Length(4, 45)
    installation_date: Date;

    @Column({ type: 'decimal', name: 'system_size' })
    @IsNotEmpty()
    @Length(4, 45)
    system_size: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 11)
    zipcode: number;

    @Column({ unsigned: true })
    @IsNotEmpty()
    @OneToOne(() => State)
    @JoinColumn({ name: 'state_id' })
    state_id: number;

    @Column({ type: 'decimal' })
    @IsNotEmpty()
    cost: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}
