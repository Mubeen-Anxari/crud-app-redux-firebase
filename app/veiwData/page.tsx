"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { deleteAllData, deleteData, fetchData } from "../redux/slice";

export default function ViewData({ handleEditIcon }: any) {
  const data = useAppSelector((state) => state.Todo.todo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteData(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllData());
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {data.length > 0 ? (
          <>
            {data.map((item) => (
              <div
                key={item.id}
                className="flex justify-between bg-white p-4 mb-4 rounded shadow"
              >
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-gray-900">
                    {item.firstName}
                  </h1>
                  <h2 className="text-md text-gray-700">{item.lastName}</h2>
                  <h3 className="text-sm text-gray-500">{item.email}</h3>
                </div>
                <div className="mt-5 gap-2 flex">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-700 text-white p-2 rounded-xl hover:bg-red-800 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleEditIcon(item);
                    }}
                    className="bg-purple-700 text-white p-2 rounded-xl hover:bg-purple-800 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
            {data.length > 1 && (
              <button
                onClick={handleDeleteAll}
                className="w-full bg-red-900 text-white p-2 rounded-xl hover:bg-red-800 transition"
              >
                Delete All
              </button>
            )}
          </>
        ) : (
          <h1 className="text-white text-center">No data found</h1>
        )}
      </div>
    </div>
  );
}
