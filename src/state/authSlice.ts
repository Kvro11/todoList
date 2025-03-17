import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  AuthState,
  SignInType,
  SignUpType,
  SocialSignType,
} from "../types/authTypes";

import { auth, db } from "../firebase/firebaseConfig";
import { fetchTodos } from "./todoSlice";

const initialState: AuthState = {
  user: {
    id: "",
    email: "",
    username: "",
  },
  isLoading: false,
  error: null,
  userData: {
    id: "",
    email: "",
    username: "",
  },
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: SignInType, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = {
        id: user.uid,
        email: user.email || "",
        username: user.displayName || "",
      };

      localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage

      dispatch(fetchTodos()); //Fetch todos after login
      return userData;
    } catch (error: any) {
      console.log("Error: ", error.message);
      let errorMessage = "Sign-in failed. Please try again."; // Default message

      if (error.code === "auth/invalid-credential") {
        errorMessage = "No account found with this email. Please sign up.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Try again later.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled by an administrator.";
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    { email, password, username }: SignUpType,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo = userCredential.user;
      await updateProfile(userInfo, { displayName: username });

      await setDoc(doc(db, "users", userInfo.uid), {
        username,
        email,
        createdDate: new Date(),
      });

      const userData = {
        id: userInfo.uid,
        email: userInfo.email || "",
        username: userInfo.displayName || "",
      };
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(fetchTodos()); // Fetch todos after signup
      return userData;
    } catch (error: any) {
      let errorMessage = "Sign-up failed. Please try again."; // Default message

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Try signing in.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password must be at least 6 characters.";
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const socialSignIn = createAsyncThunk(
  "auth/socialSignIn",
  async ({ providerType }: SocialSignType, { rejectWithValue, dispatch }) => {
    let provider: AuthProvider;

    switch (providerType) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "facebook":
        provider = new FacebookAuthProvider();
        break;
      case "twitter":
        provider = new TwitterAuthProvider();
        break;
      default:
        return rejectWithValue("Invalid provider type");
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        id: user.uid,
        email: user.email || "",
        username: user.displayName || "",
      };

      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(fetchTodos()); //Fetch todos after social login
      return userData;
    } catch (error: any) {
      console.error("Error:", error.message);

      const errorMessages: Record<string, string> = {
        "auth/invalid-credential":
          "No account found with this email. Please sign up.",
        "auth/wrong-password": "Incorrect password. Try again.",
        "auth/invalid-email": "Invalid email format.",
        "auth/too-many-requests": "Too many failed attempts. Try again later.",
        "auth/user-disabled":
          "This account has been disabled by an administrator.",
      };

      return rejectWithValue(
        errorMessages[error.code] || "Sign-in failed. Please try again."
      );
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await auth.signOut();
  return "Successfully logged out";
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload; // Set user data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.userData = null;
        localStorage.removeItem("user"); // Ensure user is removed from localStorage
        window.location.href = "/signIn"; //Hard redirect to Sign-In page
      })

      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
