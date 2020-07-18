import mongoose from 'mongoose'
import crypto from 'crypto'
//a new Mongoose schema object will specify the properties or structure of each document in a collection.
//declare all user data fields and associated properties.
//The schema will record user-related information.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },

    created: {
        type: Date,
        default: Date.now
    },
    

    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String,
    updated: Date,
    about: {
        type: String,
        trim: true,
    },
    photo: {
        data: Buffer, 
        contentType: String,
    }
})

//handling the password string as a virtual field
UserSchema
    .virtual('password')
    //When the password value is received on user creation or update, it is encrypted into
    //a new hashed value and set to the hashed_password field, along with the
    //unique salt value in the salt field.
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })


//password field validation
UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

//the encryption logic and salt generation logic
//are used to generate the hashed_password and salt values representing the password value
UserSchema.methods = {
    //to verify sign-in attempts by matching the user-provided password text with the hashed_password
    //stored in the database for a specific user.
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    //to generate an encrypted hash from the plain-text password and a unique salt value using the crypto
    //module from Node.
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },

    //generates a unique and random salt value using the current timestamp at execution and Math.random() .
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}



export default mongoose.model('User', UserSchema)