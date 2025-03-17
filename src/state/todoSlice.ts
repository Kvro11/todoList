import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { TodoState, Todo } from "../types/todoTypes";
import { AuthState } from "../types/authTypes";

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null,
};

const getUserFromState = (getState: any) => {
  const { auth } = getState() as { auth: AuthState };
  if (!auth.user) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  }
  return auth.user;
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      let userId = auth.user?.id;

      if (!userId) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          userId = JSON.parse(storedUser).id;
        }
      }

      if (!userId) return rejectWithValue("User not logged in");

      const userTodosRef = collection(db, "users", userId, "todos");
      const querySnapshot = await getDocs(userTodosRef);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch todos");
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (task: Partial<Todo>, { getState }) => {
    const user = getUserFromState(getState);

    if (!user?.id) throw new Error("User not logged in");

    const userTodosRef = collection(db, "users", user?.id, "todos");
    const docRef = await addDoc(userTodosRef, {
      date: task.date ?? new Date().toISOString(),
      title: task.title ?? "Untitled",
      desc: task.desc ?? "",
      priority: task.priority ?? "low",
      isComplete: task.isComplete ?? false,
    });

    return {
      id: docRef.id,
      date: task.date ?? new Date().toISOString(),
      title: task.title ?? "Untitled",
      desc: task.desc ?? "",
      priority: task.priority ?? "low",
      isComplete: task.isComplete ?? false,
    };
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTask: Partial<Todo> & { id: string }, { getState }) => {
    const user = getUserFromState(getState);

    if (!user?.id) throw new Error("User not logged in");

    const todoRef = doc(db, "users", user.id, "todos", updatedTask.id);
    await updateDoc(todoRef, updatedTask);

    return updatedTask;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string, { getState }) => {
    const user = getUserFromState(getState);
    if (!user?.id) throw new Error("User not logged in");

    const todoRef = doc(db, "users", user.id, "todos", id);
    await deleteDoc(todoRef);
    return id;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...action.payload }; // ✅ Merge new values
        }
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })

      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch todos";
      });
  },
});

export default todoSlice.reducer;
