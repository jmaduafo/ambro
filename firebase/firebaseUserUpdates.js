import { reauthenticateWithCredential, deleteUser, updatePassword, EmailAuthProvider } from "firebase/auth";
import { auth, db } from "./config";
import { query, collection, deleteDoc } from "firebase/firestore";

export function reauthenticateUser(oldPassword, setCredentials, setNext, Alert) {
    if (oldPassword.length) {
        try {
            const credential = EmailAuthProvider.credential(
                auth?.currentUser?.email,
                oldPassword
            )

            setNext(true)
            setCredentials(credential)
        } catch(err) {
            Alert.alert(err.message)
        }
    
    } else {
        Alert.alert("Password must be entered in to proceed")
    }
}

export function updateUserPassword(newPassword, credential, setOpen, Alert) {
    const user = auth?.currentUser

    reauthenticateWithCredential(user, credential)
        .then(() => {
          // User re-authenticated.
          // USER IS DELETED FROM AUTHENTICATION DATABASE
          updatePassword(user, newPassword)
            .then(() => {
              // User deleted.
              Alert.alert('Password updated successfully!')
            })
            .catch((error) => {
              // An error ocurred
              Alert.alert(error.message)
            });
        })
        .catch((error) => {
          // An error ocurred
          // ...
          Alert.alert(error.message)
        });
}

export function deleteUserProfile(navigate, credential, Alert) {
    const user = auth?.currentUser

    reauthenticateWithCredential(user, credential)
        .then(() => {
          // User re-authenticated.
          // USER IS DELETED FROM AUTHENTICATION DATABASE
          deleteUser(user)
            .then(() => {
              // User deleted.

              // USER IS DELETED FROM FIRESTORE DATABASE AS WELL
              async function deletePerson() {
                const userRef = query(
                  collection(db, "users"),
                  where("id", "==", auth?.currentUser?.uid)
                );
                await deleteDoc(userRef);
              }

              deletePerson();

              navigate('Login')
            })
            .catch((error) => {
              // An error ocurred
              Alert.alert(error.message)
            });
        })
        .catch((error) => {
          // An error ocurred
          // ...
          Alert.alert(error.message)
        });
}