const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('cvshine', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

class Resume extends Model { }

Resume.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.BIGINT,
        field: 'user_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    layout: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    templateId: {
        type: DataTypes.BIGINT,
        field: 'template_id'
    },
    themeId: {
        type: DataTypes.BIGINT,
        field: 'theme_id'
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
    modelName: 'Resume' // We need to choose the model name
});

module.exports = Resume;
