import { useState, useEffect } from "react";
import { getUsers } from "../api/userService";
import { mapApiUser } from "../utils/helpers";

const STORAGE_KEY = "user_management_users";

const useUsers = () => {
  const [users, setUsersState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrapper: every setUsers call also saves to localStorage
  const setUsers = (updater) => {
    setUsersState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      // Use saved state instead of hitting the API again
      setUsersState(JSON.parse(cached));
      setLoading(false);
      return;
    }

    // First load: fetch from API and cache it
    getUsers()
      .then((res) => {
        const mapped = res.data.map(mapApiUser);
        setUsersState(mapped);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users. Please check your connection and try again.");
        setLoading(false);
      });
  }, []);

  return { users, setUsers, loading, error, setError };
};

export default useUsers;