const Sequelize = require("sequelize");

// connecting to the database

module.exports = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://ttcacjxchbfwim:7da00f80f66bc3623806bc2c8710beb13e04ba3306d4b4e3d09a3a3cacd1fc59@ec2-34-197-212-240.compute-1.amazonaws.com:5432/debhrfosp7b6p8`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
