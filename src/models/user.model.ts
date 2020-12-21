import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
  })
  telephoneNumber: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dateBirth: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isTithe: boolean;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
  })
  houseNumber: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  neighborhood: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
  })
  generalRecord: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
  })
  individualRecord: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  celebration_allowed_count: number;
}
