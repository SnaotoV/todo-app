const { ObjectId } = require("mongodb");

class TodoModel {
    constructor(client) {
        this.Todo = client.db().collection("todo");
    }
    extractConactData(payload) {
        const user = {
            value:payload.value,
            checked: payload.checked,
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        )
        return user;
    }
    async create(payload) {
        const todo = this.extractConactData(payload);
        const result = await this.Todo.insertOne(
            todo
        );
        return result.insertedId;
    };
    async find() {
        const cursor = await this.Todo.find().sort({_id : -1});
        return await cursor.toArray();
    }
    async findInPage(page) {
        let start = (page - 1) * 10;
        let quantity = 10
        const cursor = await this.User.find({}, {
            skip: start,
            limit: quantity,
        });
        return await cursor.toArray();
    }
    async findByUsername(user) {
        const cursor = await this.User.find({
            username: user.username,
            password: user.password
        });
        return await cursor.toArray();
    }
    async findByID(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }
    async checkUserExist(user) {
        const cursor = await this.User.find({
            username: user.username
        });
        let data = await cursor.toArray();
        if (data && data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async countAll() {
        const cursor = await this.User.count();
        return cursor
    }
    async updated(data) {
        console.log(data);
        const filter = {
            _id: ObjectId.isValid(data._id) ? new ObjectId(data._id) : null,
        };
        const cursor = await this.Todo.updateOne(filter, {
            $set: {
                value: data.value,
                checked: data.checked
            }
        })
        return cursor
    }
    async delete(data) {
        let result = await this.Todo.findOneAndDelete({
            _id: ObjectId.isValid(data) ? new ObjectId(data) : null,
        })
        return result
    }
}

module.exports = TodoModel;