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
*  PanelInstallation:
*    type: object
*    properties:
*      id:
*        type: integer
*        format: int64
*      dataProvider:
*        type: integer
*        format: int64
*        description: Panel Installation Data Provider Id
*      installation_date:
*        type: string
*        format: date-time
*      system_size:
*        type: number
*        format: float
*      zipcode:
*        type: integer
*      stateId:
*        type: integer
*        format: int64
*        description: Panel Installation State Id
*      cost:
*        type: number
*        format: float
*    xml:
*      name: PanelInstallation
*/
@Entity()
export class PanelInstallation {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ unsigned: true, name: 'data_provider_id' })
    @IsNotEmpty()
    @OneToOne(() => DataProvider)
    @JoinColumn({ name: 'data_provider_id' })
    dataProvider: number;

    @Column({ name: 'installation_date' })
    @IsNotEmpty()
    installation_date: Date;

    @Column({ type: 'decimal', name: 'system_size', precision: 10, scale: 3 })
    @IsNotEmpty()
    system_size: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 11)
    zipcode: number;

    @Column({ unsigned: true, name: 'state_id' })
    @IsNotEmpty()
    @OneToOne(() => State)
    @JoinColumn({ name: 'state_id' })
    stateId: number;

    @Column({ type: 'decimal', precision: 14, scale: 7 })
    @IsNotEmpty()
    cost: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}
