import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDnmBH_iLyLwiFzh5Mg4dHhceWdk3cyPpI",
	authDomain: "xpensetrack-abhi.firebaseapp.com",
	projectId: "xpensetrack-abhi",
	storageBucket: "xpensetrack-abhi.firebasestorage.app",
	messagingSenderId: "719852109049",
	appId: "1:719852109049:web:a9b03c4d08acad716ff628",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		if (!user) {
			throw new Error("User data not available.");
		}
		console.log(user);
		await setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			name: user.displayName,
			email: user.email,
		});

		await setDoc(doc(db, "accounts", user.uid), {
			dateExpenses: [],
		});

		toast.success("Sign-in successful!");
	} catch (error) {
		console.error("Sign-in error:", error.message);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const logout = async () => {
	try {
		await signOut(auth);
		toast.success("Sign-out successful!");
	} catch (error) {
		console.error("Sign-out error:", error.message);
		toast.error(`Error: ${error.message}`);
	}
};

export { auth, db, logout, signInWithGoogle };
