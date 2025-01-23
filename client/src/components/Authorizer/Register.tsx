import React, { SyntheticEvent, useState } from "react";
import styles from "./Register.module.css";
import VerifyEmailReigster from "./VerifyEmailRegister";
import AuthService from "./AuthService";

interface RegisterProps {
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

const Register = ({ setSharedState }: RegisterProps) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    systemID: "",
    password: "",
    passwordConfirm: "",
    emailNeedsVerified: false,
    isLoading: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    switch (type) {
      case "firstName":
        setState({ ...state, firstName: e.target.value });
        break;
      case "lastName":
        setState({ ...state, lastName: e.target.value });
        break;
      case "email":
        setState({ ...state, email: e.target.value });
        break;
      case "systemID":
        setState({ ...state, systemID: e.target.value });
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

  const handleSignInClick = () => {
    setSharedState({
      mainMessage: "Hi, Welcome Back! ",
      subMessage: "Login Below",
      registerRequested: false,
      justRegistered: false,
      forgotPasswordRequested: false,
    });
  };

  const handleSignUpSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const confirmPasswordInput = form.querySelector(
      'input[name="passwordConfirm"]'
    ) as HTMLInputElement;

    const systemIdInput = form.querySelector(
      'input[name="systemID"]'
    ) as HTMLInputElement;

    if (state.systemID.length != 32) {
      systemIdInput.setCustomValidity("SystemID's are 32 characters");
      systemIdInput.reportValidity();

      return;
    }

    if (state.password != state.passwordConfirm) {
      confirmPasswordInput.setCustomValidity("Passwords do not match");
      confirmPasswordInput.reportValidity();

      return;
    }

    setState({ ...state, isLoading: true });
    const startTime = Date.now();

    const response = await AuthService.checkIfUserEmailExists(state.email);

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1000 - elapsedTime);

    setTimeout(() => {
      //TODO what if reponse not succesfull?  Need to display somethign went wrong try again

      if (!response.userEmailExists) {
        setState({ ...state, emailNeedsVerified: true, isLoading: false });
      } else {
        setState({ ...state, isLoading: false });

        const emailRegisterInput = form.querySelector(
          'input[name="email"]'
        ) as HTMLInputElement;

        emailRegisterInput.setCustomValidity(
          "A user with this email already exists"
        );
        emailRegisterInput.reportValidity();
        return;
      }
    }, remainingTime);
  };

  if (state.emailNeedsVerified) {
    return (
      <VerifyEmailReigster
        setSharedState={setSharedState}
        firstName={state.firstName}
        lastName={state.lastName}
        email={state.email}
        systemID={state.systemID}
        password={state.password}
      ></VerifyEmailReigster>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.mainMessage}>Almost There! &#128071;</h1>
      <h2 className={styles.subMessage}>Register Below</h2>
      <form className={styles.form} onSubmit={(e) => handleSignUpSubmit(e)}>
        <div className={styles.nameInput}>
          <input
            type="text"
            name="firstName"
            autoComplete="off"
            placeholder="First Name"
            onChange={(e) => handleInputChange(e, "firstName")}
            value={state.firstName}
            required
          ></input>
          <input
            type="text"
            name="lastName"
            autoComplete="off"
            placeholder="Last Name"
            onChange={(e) => handleInputChange(e, "lastName")}
            value={state.lastName}
            required
          ></input>
        </div>
        <input
          className={styles.email}
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => handleInputChange(e, "email")}
          value={state.email}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.setCustomValidity("");
          }}
          required
        ></input>
        <input
          className={styles.systemID}
          type="text"
          name="systemID"
          autoComplete="off"
          placeholder="System ID"
          onChange={(e) => handleInputChange(e, "systemID")}
          value={state.systemID}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.setCustomValidity("");
          }}
          required
        ></input>
        <input
          className={styles.password}
          type="password"
          name="password"
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
          className={styles.passwordConfirm}
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
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
        {state.isLoading ? (
          <button className={styles.submit} name="signUpSubmit" disabled>
            <div className={styles.loader}>
              <div className={styles.loading}></div>
            </div>
          </button>
        ) : (
          <input
            className={styles.submit}
            name="signUpSubmit"
            type="submit"
            value="Register"
          ></input>
        )}

        <h4 className={styles.signIn} onClick={handleSignInClick}>
          Already have an account? <a>Sign In</a>
        </h4>
      </form>
    </main>
  );
};

export default Register;
