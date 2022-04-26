const User = require('../models/user.model');
const extend = require('lodash/extend');
const errorHandler = require('./../helpers/dbErrorHandler');

const create = async (request, response) => {
    const user = new User(request.body)
    try {
        await user.save();
        return response.status(200).json({
            message: "Student details saved"
        });
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const read = (request, response) => {
    request.profile.hashed_password = undefined;
    request.profile.salt = undefined;
    return response.json(request.profile);
}

const list = async (request, response) => {
    try {
        const query = {};
        if (request.query.username) {
            query.name = { '$regex': request.query.username, '$options': 'i' }
        }

        let users = await User.find(query);
        response.json(users);
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

const update = async (request, response) => {
    try {
        let user = await User.findById(request.query.id);
        user = extend(user, request.body);
        user.updated = Date.now();

        await user.save();
        response.json(user);
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
};

const remove = async (request, response) => {
    try {
        await User.deleteOne({ _id: request.query.id });
        response.json({ message: 'Student terminated' });
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

module.exports = {
    create,
    read,
    list,
    remove,
    update
};
