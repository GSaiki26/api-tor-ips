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
  fk_ip_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "ips",
      key: "id"
    }
  },
};

// Code
export default deletedIpsSchema;
