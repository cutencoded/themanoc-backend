const mongoose = require('mongoose');
const crypto = require('crypto');

const GuardianSchema = new mongoose.Schema({
    guardian_name: {
        type: String,
        required: 'Guardian first name is required'
    },
    phone_number: {
        type: String,
        required: 'Guardian phone number is required'
    },
    address: {
        type: String,
        required: 'Guardian address is required'
    }
});

const UserSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: 'Student national id is required'
    },
    first_name: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    last_name: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    date_of_birth: {
        type: String,
        required: 'Student date of birth is required'
    },
    phone_number: String,
    student_email: {
        type: String,
        trim: true,
        // unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    parent_or_guardian: GuardianSchema,
    // hashed_password: {
    //     type: String,
    //     required: "Password is required"
    // },
    // salt: String,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

// UserSchema
//     .virtual('password')
//     .set(function(password) {
//         this._password = password
//         this.salt = this.makeSalt()
//         this.hashed_password = this.encryptPassword(password)
//     })
//     .get(function() {
//         return this._password
//     });

// UserSchema.path('hashed_password').validate(function(v) {
//     if (this._password && this._password.length < 6) {
//         this.invalidate('password', 'Password must be at least 6 characters.')
//     }
//     if (this.isNew && !this._password) {
//         this.invalidate('password', 'Password is required')
//     }
// }, null);

// UserSchema.methods = {
//     authenticate: function(plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },
//     encryptPassword: function(password) {
//         if (!password) return '';
//         try {
//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');
//         } catch (err) {
//             return '';
//         }
//     },
//     makeSalt: function() {
//         return Math.round((new Date().valueOf() * Math.random())) + '';
//     }
// };

module.exports = mongoose.model('User', UserSchema);
