const User = require('../models/user.model');
const extend = require('lodash/extend');
const errorHandler = require('./../helpers/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');
const profileImage = fs.readFileSync('./src/assets/images/p3.jpg');

const create = async (request, response) => {
    const user = new User(request.body)
    try {
        await user.save();
        return response.status(200).json({
            message: "Successfully signed up!"
        });
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const userByID = async (request, response, next, id) => {
    try {
        let user = await User.findById(id).populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        
        if (!user) {
            return response.status('400').json({
                error: "User not found"
            });
        };
        
        request.profile = user;
        next();
    } catch (error) {
        return response.status('400').json({
            error: "Could not retrieve user"
        });
    }
};

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

const update = (request, response) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(request, async (error, fields, files) => {
        if (error) {
            return response.status(400).json({
                error: "Photo could not be uploaded"
            })
        }

        let user = request.profile;
        user = extend(user, fields);
        user.updated = Date.now();

        if(files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }
        try {
            await user.save();
            user.hashed_password = undefined;
            user.salt = undefined;
            response.json(user);
        } catch (error) {
            return response.status(400).json({
                error: errorHandler.getErrorMessage(error)
            })
        }
    });
};

const remove = async (request, response) => {
    try {
        let user = request.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        response.json(deletedUser);
    } catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
};

module.exports = {
    create,
    userByID,
    read,
    list,
    remove,
    update
};
