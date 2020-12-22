import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    validate: {
      len: {
        args: [10, 11],
        msg:
          'Minimum 10 and maximum 11 characteres allowed in telephone number',
      },
      notEmpty: {
        msg: 'Telephone number cannot be empty',
      },
      notNull: {
        msg: 'Telephone number is required',
      },
    },
  })
  telephoneNumber: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [10, 100],
        msg: 'Minimum 10 and maximum 100 characteres allowed in full name',
      },
      notEmpty: {
        msg: 'Full name cannot be empty',
      },
      notNull: {
        msg: 'Full name is required',
      },
    },
  })
  fullName: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Date birth cannot be empty',
      },
      notNull: {
        msg: 'Date birth is required',
      },
    },
  })
  dateBirth: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isTithe: boolean;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [10, 100],
        msg: 'Minimum 10 and maximum 100 characteres allowed in street',
      },
      notEmpty: {
        msg: 'Street cannot be empty',
      },
      notNull: {
        msg: 'Street is required',
      },
    },
  })
  street: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
    validate: {
      len: {
        args: [1, 5],
        msg: 'Minimum 1 and maximum 5 characteres allowed in house number',
      },
      notEmpty: {
        msg: 'House number cannot be empty',
      },
      notNull: {
        msg: 'House number is required',
      },
    },
  })
  houseNumber: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [5, 50],
        msg: 'Minimum 5 and maximum 50 characteres allowed in neighborhood',
      },
      notEmpty: {
        msg: 'Neighborhood cannot be empty',
      },
      notNull: {
        msg: 'Neighborhood is required',
      },
    },
  })
  neighborhood: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [5, 100],
        msg: 'Minimum 5 and maximum 100 characteres allowed in city',
      },
      notEmpty: {
        msg: 'City cannot be empty',
      },
      notNull: {
        msg: 'City is required',
      },
    },
  })
  city: string;

  @Column({
    type: DataType.STRING(2),
    allowNull: false,
    validate: {
      len: {
        args: [2, 2],
        msg: 'Only 2 characteres allowed in state',
      },
      notEmpty: {
        msg: 'State cannot be empty',
      },
      notNull: {
        msg: 'State is required',
      },
    },
  })
  state: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [9, 11],
        msg: 'Minimum 9 and maximum 11 characteres allowed in general record',
      },
      notEmpty: {
        msg: 'General record cannot be empty',
      },
      notNull: {
        msg: 'General record is required',
      },
    },
  })
  generalRecord: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [11, 11],
        msg: 'Only 11 characteres allowed in individual record',
      },
      notEmpty: {
        msg: 'Individual record cannot be empty',
      },
      notNull: {
        msg: 'Individual record is required',
      },
    },
  })
  individualRecord: string;

  @Column({
    type: DataType.STRING(10),
    defaultValue: 'FAITH',
  })
  role: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 3,
    validate: {
      min: {
        args: [1],
        msg: 'Minimum 1 celebration allowed',
      },
    },
  })
  celebration_allowed_count: number;
}
