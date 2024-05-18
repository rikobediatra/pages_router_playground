import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signIn (
  userData: { email: string }
) {
  const q = query (
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshoot = await getDocs(q);
  const data = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
} 

export async function signUP (
  userData: { email: string; name: string; password: string; role:string },
  callback: Function
) {
  // cek email sudah ada
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  
  if (data.length > 0) {
    callback({ status: false, message: "Data already exist"});
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData).then(() => {
      callback({ status: true, message: "Register success" })
    }).catch((error) => {
      callback({ status: false, message: error })
    });
  }
}

export async function signInWithGoogle( 
  userData: any,
  callback: Function
) {
  // cek email ada atau tidak
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshoot = await getDocs(q);

  const data: any = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  if (data.length > 0){
    // update data
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
    .then(() => {
      callback({status: true, message: "Sign in with google data"});
    }).catch(() => {
      callback({status: false, message: "Failed to login with google"});
    });

  } else {
    userData.role = "member"
    await addDoc(collection(firestore, "users"), userData)
    .then(() => {
      callback({status: true, message: "Sign in with google data"});
    }).catch(() => {
      callback({status: false, message: "Failed to login with google"});
    });
  }
}
