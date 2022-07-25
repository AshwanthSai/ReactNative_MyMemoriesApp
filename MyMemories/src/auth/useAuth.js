import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./Storage";
//this is custom which is use to create ease for storage funtion with simplefied code
export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => {
    // const user = jwtDecode(AuthToken);
    setUser(user);
    authStorage.storeUser(user);
  };

  const logOut = () => {
    setUser(null);
    authStorage.deleteUser();
  };

  return { user, logOut, logIn, setUser };
};
