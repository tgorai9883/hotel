import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  async function login(){
    const user ={email,password};

    try {
      setLoading(true);
      const result = (await axios.post("/api/users/login",user)).data;
      console.log(result);
      
      setLoading(false);

      localStorage.setItem("currentUser",JSON.stringify(result));
      window.location.href="/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div>
      <div className="row justify-content-center" style={{ marginTop: "135px" }}>
        <div className="col-sm-5 shadow-lg rounded">
          {loading? <Loader/>: error? <Error message='Wrong Credentionals'/>:
          <div>
          <h2 className="text-center mt-4"><b>Login To Book Hotel</b></h2>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control className="border border-dark" type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="border border-dark" type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Group>
            <Button variant="dark" type="submit">Login</Button>
          </Form>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
