import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/AdminHome/Home";
import LogIn from "./components/LogIn";
import UserHome from "./components/UserHome/UserHome";

function App() {
  const [login, setLogin] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [userInput, setUserInput] = useState([]);

  const { Email } = userInput;
  // console.log(Email);

  // const fetchAdmin = async () => {
  //   const res = axios
  //     .get(`http://localhost:3000/admin`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setAdminData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const fetchAdmin = async () => {
    const res = await fetch("http://localhost:3000/admin");
    const data = await res.json();
    setAdminData(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const AdminMail = adminData[0]?.Email;
  const AdminPass = adminData[0]?.password;

  return (
    <div className="App">
      {/* <Home /> */}
      {/* <UserHome /> */}
      <Routes>
        {!login ? (
          <Route
            path="/"
            element={
              <LogIn
                login={login}
                setLogin={setLogin}
                setUserInput={setUserInput}
                AdminMail={AdminMail}
                AdminPass={AdminPass}
              />
            }
          />
        ) : AdminMail === Email ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<UserHome />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
