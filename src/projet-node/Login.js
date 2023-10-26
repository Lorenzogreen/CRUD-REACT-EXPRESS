import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    
    <div className = "Auth">
      <div class="backgound"></div>
      <div class="container">
        <div class= "content">
          <h1>Stage à la gars FCE</h1>
        </div>
        <div class= "logreg-box">
            <div class = "login">
              <form className = "form">
                <h2>Login</h2>
                <div className= "input">
                  <input required type = "text" placeholder = "UserName"/>
                </div>
                <div className = "input">
                  <input required type = "text" placeholder = "password"/>
                </div>
                <button className= "btn"> <Link to = "/nav">Login</Link> </button>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Login;
