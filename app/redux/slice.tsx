import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import { create } from "domain";

// In your redux slice file

interface TodoType {
  id: string; // Mark id as optional for creation
  firstName: string;
  lastName: string;
  email: string;
}

export const addTodoToFirestore = createAsyncThunk<
  TodoType,
  Omit<TodoType, "id">
>("data/addTodoToFirestore", async (data) => {
  try {
    const addTodoRef = await addDoc(collection(db, "Data"), data);
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
      // Reference the document to be deleted
      const docRef = doc(db, "Data", id);

      // Perform the deletion
      await deleteDoc(docRef);
    } catch (error) {
      // Log the error and return a rejected value for error handling
      console.error("Failed to delete document:", error);
      return rejectWithValue(error);
    }
  }
);
export const deleteAllData=createAsyncThunk(
  "data/deleteAllData",async()=>{
const datas=await getDocs(collection(db,"data"))
for(var snap of datas.docs){
  await deleteDoc(doc(db,"data",snap.id))
}
return []
  }
)
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
    builder.addCase(deleteAllData.fulfilled, (state, action) => {
      state.todo = action.payload;
    });
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
