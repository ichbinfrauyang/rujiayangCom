import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { URL } from "../../src/url";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", { withCredentials: true });
      //   console.log(res.data);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
