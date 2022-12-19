import { STATUS_CODES } from "http";
import { Sequelize, Model, DataType, DataTypes } from "sequelize";
import StatusCodes from './StatusCodes.js'


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './transactions.sqlite'
})

class TransactionDB extends Model {
    public fromUUID!: string;
    public amount!: number;
    public toUUID!: string;
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
})

sequelize.sync({ force: false })

class TransactionLog {

    static async transactionLog(fromUUID: string, toUUID: string, amount: number) {
        return new Promise(async (resolve, reject) => {

            try {
                await sequelize.transaction(async (t) => {
                    const transaction = await TransactionDB.create({ fromUUID, toUUID, amount })
                    await transaction.save()
                    resolve(StatusCodes.success.success)
                })

            } catch (e: any) {
                throw Error(e.message)
            }
        })

    }
}

export default TransactionLog