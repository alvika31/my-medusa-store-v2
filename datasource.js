const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "medusa-xXJ2",
  entities: [
    "dist/models/*.js",
  ],
  autoLoadEntities: true,
  migrations: [
    "dist/migrations/*.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}