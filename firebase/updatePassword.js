import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "./config";

export function updatePassword(oldPassword, newPassword) {
    let errorMessage;
    let success; 

    if (oldPassword.length) {
        const credential = EmailAuthProvider.credential(
            auth?.currentUser?.email,
            oldPassword
        )

        const user = auth?.currentUser

        async function authenticate() {
            if (oldPassword.length && newPassword.length) {
                await reauthenticateWithCredential(
                    auth?.currentUser, 
                    credential
                ).then(result => {
                    user.updatePassword(newPassword)
                    .then(() => {
                        // Update successful.
                        success = 'Password changed successfully!';
                        errorMessage = ''
                    }).catch((error) => {
                        // An error occurred
                        // ...
                        errorMessage = error.message
                    });
                }).catch(err => {
                    errorMessage = err.message
                })
            }
        }

    authenticate()
    
    }

    

    return { error, success }
}