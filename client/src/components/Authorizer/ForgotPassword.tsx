import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import AuthService from "./AuthService";
import VerifyEmailForgotPassword from "./VerifyEmailForgotPassword";

interface ForgotPasswordProps {
  setSharedState: React.Dispatch<
    React.SetStateAction<{
      mainMessage: string;
      subMessage: string;
      registerRequested: boolean;
      justRegistered: boolean;
      forgotPasswordRequested: boolean;
    }>
  >;
}

const ForgotPassword = ({ setSharedState }: ForgotPasswordProps) => {
  const [state, setState] = useState({
    mainMessage: "Forgot your password?",
    subMessage: "Enter your account email below",
    email: "",
    emailNeedsVerified: false,
    emailExists: false,
    emailVerified: false,
    password: "",
    passwordConfirm: "",
    isLoading: false,
  });

  const handleSignUpClick = () => {
    setSharedState({
      mainMessage: "Hi, Welcome Back! ",
      subMessage: "Login Below",
      registerRequested: false,
      justRegistered: false,
      forgotPasswordRequested: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    switch (type) {
      case "email":
        setState({ ...state, email: e.target.value });
        break;
      case "password":
        setState({ ...state, password: e.target.value });
        break;
      case "passwordConfirm":
        setState({ ...state, passwordConfirm: e.target.value });
        break;
      default:
        console.log(
          "Register input change went to default (handling input change)...check this out"
        );
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const confirmPasswordInput = form.querySelector(
      'input[name="passwordConfirm"]'
    ) as HTMLInputElement;

    //ensure both passwords match
    if (state.password != state.passwordConfirm) {
      confirmPasswordInput.setCustomValidity("Passwords do not match");
      confirmPasswordInput.reportValidity();

      return;
    }

    const startTime = Date.now();

    setState({ ...state, isLoading: true });

    const response = await AuthService.setNewPasswordForUser(
      state.email,
      state.password
    );

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1500 - elapsedTime);

    setTimeout(() => {
      if (response.passwordMatches) {
        setState({
          ...state,
          subMessage: "Your new password cannot match your old password",
          isLoading: false,
        });

        return;
      }

      if (!response.passwordMatches && response.passwordMatches != null) {
        setState({
          ...state,
          subMessage: "Your new password has been set!  Moving to login",
          isLoading: true,
        });

        setTimeout(() => {
          setSharedState({
            mainMessage: "Hi, Welcome Back! ",
            subMessage: "Login Below",
            registerRequested: false,
            justRegistered: false,
            forgotPasswordRequested: false,
          });
        }, 2500);
      }
    }, remainingTime);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const startTime = Date.now();

    setState({ ...state, isLoading: true });

    const response = await AuthService.checkIfUserEmailExists(state.email);

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1500 - elapsedTime);

    setTimeout(() => {
      setState({
        ...state,
        isLoading: false,
        emailNeedsVerified: true,
        emailExists: response.userEmailExists === true,
      });

      //here email exists or doesnt (dont let user know just say if email exisstt you will receive pin or soemthing)
    }, remainingTime);
  };

  if (state.emailNeedsVerified) {
    return (
      <VerifyEmailForgotPassword
        sharedState={state}
        setSharedState={setState}
      ></VerifyEmailForgotPassword>
    );
  }

  if (state.emailVerified) {
    return (
      <main className={styles.main}>
        <h1 className={styles.mainMessage}>{state.mainMessage}&#128075;</h1>
        <h2 className={styles.subMessage}>{state.subMessage}</h2>
        <form
          className={styles.form}
          onSubmit={(e) => handleNewPasswordSubmit(e)}
        >
          <div className={styles.passwordInput}>
            {" "}
            <input
              className={styles.password}
              id="password"
              type="password"
              placeholder="Password"
              maxLength={50}
              onChange={(e) => handleInputChange(e, "password")}
              value={state.password}
              onInput={(e) => {
                const confirmInput = e.target as HTMLInputElement;
                const passwordInput =
                  confirmInput.nextElementSibling as HTMLInputElement;
                confirmInput.setCustomValidity("");
                passwordInput.setCustomValidity("");
              }}
              required
            ></input>
            <input
              className={styles.password}
              type="password"
              id="passwordConfirm"
              placeholder="Password Confirm"
              name="passwordConfirm"
              maxLength={50}
              onChange={(e) => handleInputChange(e, "passwordConfirm")}
              value={state.passwordConfirm}
              onInput={(e) => {
                const confirmInput = e.target as HTMLInputElement;
                const passwordInput =
                  confirmInput.previousElementSibling as HTMLInputElement;
                confirmInput.setCustomValidity("");
                passwordInput.setCustomValidity("");
              }}
              required
            ></input>
          </div>

          {state.isLoading ? (
            <button className={styles.submit} disabled>
              <div className={styles.loader}>
                <div className={styles.loading}></div>
              </div>
            </button>
          ) : (
            <input
              className={styles.submit}
              name="newPasswordSubmit"
              type="submit"
              value="Confirm"
              id={styles.newPasswordSubmit}
            ></input>
          )}
        </form>
      </main>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.mainMessage}>{state.mainMessage} &#128533;</h1>
        <h2 className={styles.subMessage}>{state.subMessage}</h2>
        <form className={styles.form} onSubmit={(e) => handleEmailSubmit(e)}>
          <div className={styles.emailInput}>
            <input
              className={styles.email}
              id="email"
              name="email"
              type="text"
              onChange={(e) => handleInputChange(e, "email")}
              value={state.email}
              placeholder="Email Address"
              autoComplete="true"
              required
            ></input>
          </div>
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
              value="Confirm"
            ></input>
          )}
          <h4 className={styles.signUp} onClick={handleSignUpClick}>
            Back to <a>Sign Up</a>
          </h4>
        </form>
      </main>
    </>
  );
};

export default ForgotPassword;
