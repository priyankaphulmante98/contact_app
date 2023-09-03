import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AllRoutes from "./Routes/AllRoutes";
import { getContacts } from "./Redux/contact/contact.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
