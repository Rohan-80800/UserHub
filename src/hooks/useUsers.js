import { useState, useEffect, useCallback } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOperating, setIsOperating] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      window.message.error("Failed to load users: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUserById = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("User not found");
      return await response.json();
    } catch (err) {
      window.message.error("Failed to load user: " + err.message);
      throw err;
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    setIsOperating(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error("Failed to create user");
      const newUser = await response.json();
      const uniqueUser = { ...newUser, id: Date.now() };
      setUsers((prev) => [uniqueUser, ...prev]);
      window.message.success(`User ${userData.name} created successfully`);
      return uniqueUser;
    } catch (err) {
      window.message.error("Failed to create user: " + err.message);
      throw err;
    } finally {
      setIsOperating(false);
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    setIsOperating(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, id })
      });
      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...userData } : user))
      );
      window.message.success(`User ${userData.name} updated successfully`);
      return updatedUser;
    } catch (err) {
      window.message.error("Failed to update user: " + err.message);
      throw err;
    } finally {
      setIsOperating(false);
    }
  }, []);

  const deleteUser = useCallback(async (id, userName) => {
    setIsOperating(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user.id !== id));
      window.message.success(`User ${userName} deleted successfully`);
      return true;
    } catch (err) {
      window.message.error("Failed to delete user: " + err.message);
      throw err;
    } finally {
      setIsOperating(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    isOperating,
    error,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
  };
};

export default useUsers;
