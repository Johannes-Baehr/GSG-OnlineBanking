import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt'
import StatusCodes from './StatusCodes.js'
import TransactionLog from './TransactionLog.js';
import { rejects } from 'assert';

const saltRounds = 8

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './account.sqlite'
});


class User extends Model {
  public uuid!: string;
  public pin!: string;
  public balance!: number;
}

User.init({
  uuid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 500
  },
}, {
  sequelize,
  modelName: 'user',

  timestamps: true,
  updatedAt: false,
  createdAt: true
})



// create the table in the database
sequelize.sync({ force: false })

class AccountHandler {

  static async addUser(uuid: string, pin: string): Promise<number> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pin, saltRounds, async (err, hash) => {
        if (err === undefined) {
          try {
            await User.create({ uuid, pin: hash })
            resolve(StatusCodes.success.created)
          } catch (e: any) {
            if (e.name === 'SequelizeUniqueConstraintError') { resolve(StatusCodes.error.conflict) }
            else { resolve(StatusCodes.error.server) }
          }
        } else {
          resolve(StatusCodes.error.server)
        }
      })
    })
  }

  static newTransaction(fromUUID: string, toUUID: string, fromPIN: string, amount: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      if (await this.authenticate(fromUUID, fromPIN) === StatusCodes.error.authFail) {
        resolve(StatusCodes.error.authFail);
      }

      amount = Math.floor(amount * 100) / 100;
      if (fromUUID === toUUID) {
        resolve(StatusCodes.error.sameUUID);
      }
      if (amount < 0.01) {
        resolve(StatusCodes.error.amount);
      }
      // auth user
      try {
        await sequelize.transaction(async (t) => {
          const sender = await User.findOne({
            where: { uuid: fromUUID },
            attributes: ["balance"],
          });
          const reciever = await User.findOne({
            where: { uuid: toUUID },
            attributes: ["balance"],
          });

          if (reciever === null || sender === null) {
            throw Error(StatusCodes.error.invalidUUID.toString());
          }
          if (sender.dataValues.balance < amount) {
            throw Error(StatusCodes.error.balance.toString());
          }

          await User.update(
            { balance: sender.dataValues.balance - amount },
            { where: { uuid: fromUUID } }
          );
          await User.update(
            { balance: reciever.dataValues.balance + amount },
            { where: { uuid: toUUID } }
          );
          TransactionLog.transactionLog(fromUUID, toUUID, amount)
        });
        resolve(StatusCodes.success.success);
      } catch (e: any) {
        resolve(e.message);
      }
    });
  }

  static async authenticate(uuid: string, pin: string) {
    return new Promise((resolve, reject) => {
      User.findByPk(uuid).then((user) => {
        if (user !== null) {
          bcrypt.compare(pin, user.dataValues.pin, (err, result) => {
            if (result) {
              resolve(StatusCodes.success.auth);
            } else {
              resolve(StatusCodes.error.authFail);
            }
          });
        } else {
          resolve(StatusCodes.error.authFail);
        }
      }).catch(() => {
        reject(StatusCodes.error.authFail);
      });
    });
  }

}

export default AccountHandler

// insert a new user into the database



