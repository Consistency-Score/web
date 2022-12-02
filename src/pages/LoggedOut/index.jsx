import { useEffect } from "react";
import axios from "axios";

const LogoutPage = () => {
  useEffect(() => {
    axios.get("http://localhost:3000/logout", {}).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return <div>Logged Out Successfully.</div>;
};

export default LogoutPage;
