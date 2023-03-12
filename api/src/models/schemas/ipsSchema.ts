// Libs
import Sequelize from "sequelize";
import { ModelAttributes } from "sequelize/types";

// Data
const deletedIpsSchema: ModelAttributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  visible: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
};

// Code
export default deletedIpsSchema;
