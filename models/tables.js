const { Sequelize, Model, DataTypes } = require("sequelize");
// const { FOREIGNKEYS } = require("sequelize/types/query-types");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

class Property extends Model {}

Property.init(
  {
    Property_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Property_name: DataTypes.STRING,
    Property_type: DataTypes.STRING,
    Property_price: DataTypes.INTEGER,
    coordinates: DataTypes.STRING,
    nearest_bus_stop: DataTypes.STRING,
    active_property: DataTypes.BOOLEAN,
    Property_image: DataTypes.STRING,
    amenities_id: DataTypes.UUID,
  },
  { sequelize, modelName: "property" }
);

class Amenities extends Model {}

Amenities.init(
  {
    amenities_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      notNull: true,
    },
    amenities_name: DataTypes.STRING,
    amenities_type: DataTypes.STRING,
  },
  { sequelize, modelName: "amenities" }
);

// Property.Amenities = Property.belongsTo(Amenities);
// Property.belongsTo(Amenities, {
//   constraints: true,
// });
Amenities.hasMany(Property, {
  foreignKey: {
    name: "amenities_id",
    allowNull: false,
  },
});

module.exports = {
  Property,
  Amenities,
  sequelize,
};
