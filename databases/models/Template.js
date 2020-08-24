const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('cvshine', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

class Template extends Model { }

Template.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.TIME,
        field: 'updated_at'
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Template' // We need to choose the model name
});

// the defined model is the class itself
console.log(Template === sequelize.models.Template); // true

module.exports = Template;
