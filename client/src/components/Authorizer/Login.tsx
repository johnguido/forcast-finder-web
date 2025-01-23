import React, { useState } from "react";
import Register from "./Register.tsx";
import ForgotPassword from "./ForgotPassword.tsx";
import styles from "./Login.module.css";
import AuthService from "./AuthService.tsx";

interface LoginProps {
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    }>
  >;
}

const Login = ({ setUser }: LoginProps) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

  const [sharedState, setSharedState] = useState({
    mainMessage: "Hello There! ",
    subMessage: "Login Below",
    registerRequested: false,
    justRegistered: false,
    forgotPasswordRequested: false,
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value });
  };

  const handleSignUpClick = () => {
    setState({ ...state, email: "", password: "" });
    setSharedState({ ...sharedState, registerRequested: true });
  };

  const handleForgotPasswordClick = () => {
    setState({ ...state, email: "", password: "" });
    setSharedState({ ...sharedState, forgotPasswordRequested: true });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setState({ ...state, isLoading: true });
    const startTime = Date.now();

    const response = await AuthService.loginUser(state.email, state.password);

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1500 - elapsedTime);

    setTimeout(() => {
      if (response.user) {
        setState({ ...state, isLoading: false });
        setUser(response.user);
      } else {
        setState({ ...state, isLoading: false });
        setSharedState({
          ...sharedState,
          subMessage: "Invalid email or password",
        });
      }
    }, remainingTime);
  };

  if (sharedState.registerRequested) {
    return <Register setSharedState={setSharedState}></Register>;
  }

  if (sharedState.forgotPasswordRequested) {
    return <ForgotPassword setSharedState={setSharedState}></ForgotPassword>;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.mainMessage}>{sharedState.mainMessage}&#128075;</h1>
      <h2 className={styles.subMessage}>{sharedState.subMessage}</h2>
      <form className={styles.form} onSubmit={(e) => handleLoginSubmit(e)}>
        <div className={styles.emailInput}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.email}
            id="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="true"
            onChange={(e) => handleEmailChange(e)}
            value={state.email}
            required
          ></input>
        </div>
        <div className={styles.passwordInput}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.password}
            type="password"
            id="password"
            placeholder="Enter your password"
            maxLength={50}
            onChange={(e) => handlePasswordChange(e)}
            value={state.password}
            required
          ></input>
        </div>
        <h3
          className={styles.forgotPassword}
          onClick={handleForgotPasswordClick}
        >
          Forgot password?
        </h3>
        {state.isLoading ? (
          <button className={styles.submit} name="signUpSubmit" disabled>
            <div className={styles.loader}>
              <div className={styles.loading}></div>
            </div>
          </button>
        ) : (
          <input
            className={styles.submit}
            name="emailSubmit"
            type="submit"
            value="Login"
          ></input>
        )}
        <h4 className={styles.signUp} onClick={handleSignUpClick}>
          Don't have an account? <a>Sign Up</a>
        </h4>
      </form>
    </main>
  );
};

export default Login;
