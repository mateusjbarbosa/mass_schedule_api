export default function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 50],
        notNull: {
          msg: "Name is required",
        },
      },
    },
    celebration_allowed_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      validate: {
        notEmpty: true,
      },
    },
    date_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: "Date birth is required",
        },
      },
    },
    is_tithe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: "Tithe is required",
        },
      },
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
        notNull: {
          msg: "Street is required",
        },
      },
    },
    house_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 5],
        notNull: {
          msg: "House number is required",
        },
      },
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
        notNull: {
          msg: "Neighborhood is required",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
        notNull: {
          msg: "City is required",
        },
      },
    },
    general_record: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [11],
        notNull: {
          msg: "General Record is required",
        },
      },
    },
    individual_record: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [11],
        notNull: {
          msg: "Individual Record is required",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NORMAL",
      validate: {
        notEmpty: true,
        len: [5],
      },
    },
  });

  return User;
}
