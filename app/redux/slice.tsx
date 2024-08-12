import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";

interface TodoType {
  id?: string; // id is optional for creation
  firstName: string;
  lastName: string;
  email: string;
}

export const addTodoToFirestore = createAsyncThunk<
  TodoType,
  Omit<TodoType, "id">
>("data/addTodoToFirestore", async (data) => {
  try {
    const addTodoRef = await addDoc(collection(db, "data"), data);
    return { ...data, id: addTodoRef.id }; // Add the id to the returned object
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw error;
  }
});

export const fetchData = createAsyncThunk<TodoType[]>(
  "data/fetchData",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "data"));
      const todos: TodoType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TodoType, "id">),
      }));
      return todos;
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      throw error;
    }
  }
);

export const deleteData = createAsyncThunk<void, string>(
  "data/deleteData",
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "data", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Failed to delete document:", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteAllData = createAsyncThunk<void>(
  "data/deleteAllData",
  async () => {
    const querySnapshot = await getDocs(collection(db, "data"));
    const deletePromises = querySnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );
    await Promise.all(deletePromises);
  }
);

export const updateData = createAsyncThunk<
  TodoType,
  { id: string; data: Partial<TodoType> }
>("data/updateData", async ({ id, data }) => {
  try {
    const docRef = doc(db, "data", id);
    await updateDoc(docRef, data);
    return { id, ...data } as TodoType;
  } catch (error) {
    console.error("Failed to update document:", error);
    throw error;
  }
});

interface CounterState {
  todo: TodoType[];
}

const initialState: CounterState = {
  todo: [],
};

export const counterSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodoToFirestore.fulfilled, (state, action) => {
      state.todo.push(action.payload);
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.todo = action.payload;
    });
    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.todo = state.todo.filter((item) => item.id !== action.meta.arg);
    });
    builder.addCase(deleteAllData.fulfilled, (state) => {
      state.todo = [];
    });
    builder.addCase(updateData.fulfilled, (state, action) => {
      const index = state.todo.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.todo[index] = action.payload;
      }
    });
  },
});

export default counterSlice.reducer;
