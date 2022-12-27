import { Sequelize, Model, DataTypes, Op } from "sequelize";
import StatusCodes from './StatusCodes.js';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './transactions.sqlite'
});
class TransactionDB extends Model {
}
TransactionDB.init({
    fromUUID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    toUUID: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'transactions',
    timestamps: true,
    updatedAt: false,
    createdAt: true
});
sequelize.sync({ force: false });
class TransactionLog {
    static async transactionLog(fromUUID, toUUID, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                await sequelize.transaction(async (t) => {
                    const transaction = await TransactionDB.create({ fromUUID, toUUID, amount });
                    await transaction.save();
                    resolve(StatusCodes.success.success);
                });
            }
            catch (e) {
                throw Error(e.message);
            }
        });
    }
    static async getTransactions(uuid) {
        return new Promise(async (resolve, reject) => {
            const transactions = await TransactionDB.findAll({
                attributes: ['fromUUID', 'amount', 'createdAt'],
                where: {
                    [Op.or]: [
                        { fromUUID: uuid },
                        { toUUID: uuid }
                    ]
                }
            });
            resolve(transactions);
        });
    }
    static processTransactions(transactions, uuid, startValue = 500) {
        let nextValue = startValue;
        for (const transaction of transactions) {
            if (transaction.fromUUID === uuid) {
                nextValue -= transaction.amount;
            }
            else {
                nextValue += transaction.amount;
            }
            transaction.amount = nextValue;
            delete transaction.dataValues.fromUUID;
        }
        return transactions;
    }
}
export default TransactionLog;
