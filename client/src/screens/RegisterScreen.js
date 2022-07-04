import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function register(){
      if(password === cpassword){
          const user ={name,email,password};
          console.log(user);
          try {
            setLoading(true);
            await axios.post("/api/users/register",user);
            setLoading(false);
            setSuccess(true);
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
      } else {
          console.log("Password not matched");
          setError(true);
      }
  }
  return (
    <div>
      <div className="row justify-content-center" style={{ marginTop: "135px" }}>
        <div className="col-sm-5 shadow-lg rounded">
          <h1 className="text-center mt-4"><b>Register</b></h1>
          {loading ? <Loader/> :
          error ? <Error/> :
          success ? <Success message='You are successfully registered'/> :
          <Form onSubmit={register}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control className="border border-dark" type="name" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control className="border border-dark" type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="border border-dark" type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="cpassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className="border border-dark" type="password" placeholder="Confirm Password" value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>
            </Form.Group>
            <Button className="mt-3" variant="dark" type="submit">Register</Button>
          </Form>}
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
