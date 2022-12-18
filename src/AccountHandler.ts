import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

class User extends Model {
  public uuid!: string;
  public pin!: string;
}

User.init({
  uuid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'user',
})

// create the table in the database
sequelize.sync({ force: true })

class AccountHandler {

  static async addUser(uuid: string, pin: number): Promise<boolean> {
    try {
      const user = await User.create({ uuid, pin })
      return true
    } catch {
      return false
    }
  }

}

export default AccountHandler

// insert a new user into the database



