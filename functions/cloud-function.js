const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendEmailVerification = functions.auth.user().onCreate((user) => {
    return user.sendEmailVerification();
});
