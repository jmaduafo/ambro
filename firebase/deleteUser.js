import { auth, db } from "./config";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

export function handleDeleteUser(password) {
    let errorMessage;
    let success;
    
    if (!password) {
      errorMessage = "Password must be entered in to confirm delete"
    } else {
      const user = auth?.currentUser;

      // PROMPT USER TO ENTER PASSWORD IN ORDER TO REAUTHENTICATE AND CONFIRM DELETE
      const credential = EmailAuthProvider.credential(
        user?.email,
        password
      );

      // AFTER USER IS REAUTHENTICATED, DELETE USER AND NAVIGATE TO HOME
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
                  where("id", "==", user?.uid)
                );
                await deleteDoc(userRef);
              }

              deletePerson();

              success = 'User was deleted successfully!'
              errorMessage = ''
            })
            .catch((error) => {
              // An error ocurred
              errorMessage =
                "Something went wrong. User was unable to be deleted"
              ;
              success =
                ""
              ;
            });
        })
        .catch((error) => {
          // An error ocurred
          // ...
          errorMessage =
            "Please check your password to make sure that the correct password was entered"
          success = ''
        });
    }

    return { errorMessage, success}
  }