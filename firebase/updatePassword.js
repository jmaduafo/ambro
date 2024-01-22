import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";
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
                    user, 
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
                        success = '';
                        errorMessage = error.message
                    });
                }).catch(err => {
                    success = '';
                    errorMessage = err.message
                })
            }
        }

    authenticate()
    
    } else {
        error = "Password must be entered in to update password"
    }

    

    return { error, success }
}