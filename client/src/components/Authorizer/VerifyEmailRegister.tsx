import { useState, useEffect } from "react";
import styles from "./VerifyEmailRegister.module.css";
import AuthService from "./AuthService";

interface VerfiyEmailProps {
  setSharedState: React.Dispatch<
    React.SetStateAction<{
      mainMessage: string;
      subMessage: string;
      registerRequested: boolean;
      justRegistered: boolean;
      forgotPasswordRequested: boolean;
    }>
  >;

  firstName: string;
  lastName: string;
  email: string;
  systemID: string;
  password: string;
}

const VerifyEmailRegister = ({
  setSharedState,
  firstName,
  lastName,
  email,
  systemID,
  password,
}: VerfiyEmailProps) => {
  const [state, setState] = useState({
    emailPin: ["", "", "", "", "", ""],
    isLoading: false,
    subMessage: `Sending a 6 digit pin to ${email}`,
    pin: "",
  });

  const sendPinToEmail = async () => {
    setState({ ...state, isLoading: true });
    const startTime = Date.now();

    const pin = Math.floor(100000 + Math.random() * 900000);

    const response = await AuthService.sendPinToEmail(email, String(pin));

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1500 - elapsedTime);

    setTimeout(() => {
      if (response.pinSentToEmail) {
        setState({
          ...state,
          isLoading: false,
          subMessage: `Pin sent to ${email}`,
          pin: String(pin),
        });
      } else {
        console.error("Error sending PIN");
        setState({ ...state, isLoading: false });
      }
    }, remainingTime);
  };

  const registerUser = async () => {
    let systemID = "";
    for (let i = 0; i < 32; i++) {
      systemID += "0";
    }

    const reponse = await AuthService.registerUser(
      firstName,
      lastName,
      email,
      systemID,
      password
    );

    return reponse.userID;
  };

  useEffect(() => {
    sendPinToEmail();
  }, []);

  const handleResendEmailPinClick = async () => {
    if (state.isLoading) return;
    sendPinToEmail();
  };

  const handleVerifyEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pinInput = state.emailPin.join("");

    setState({ ...state, isLoading: true });

    setTimeout(async () => {
      if (pinInput === state.pin) {
        setState({
          ...state,
          isLoading: true,
          subMessage: "Success!  Reigstering user and moving to login",
        });

        const userID = await registerUser();

        if (userID) {
          setTimeout(() => {
            setSharedState({
              mainMessage: "Hi, Welcome Back! ",
              subMessage: "Registration Successful! Login Below.",
              registerRequested: false,
              justRegistered: true,
              forgotPasswordRequested: false,
            });
          }, 1500);
        } else {
          setTimeout(() => {
            setSharedState({
              mainMessage: "Hi, Welcome Back! ",
              subMessage: "Something went wrong.  Please try again",
              registerRequested: false,
              justRegistered: false,
              forgotPasswordRequested: false,
            });
          }, 1500);
        }
      } else {
        setState({
          ...state,
          emailPin: ["", "", "", "", "", ""],

          isLoading: false,
          subMessage: "Invalid pin.  Please try again.",
        });
      }
    }, 1500);
  };

  const handleEmailPinKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();

    const input = e.target as HTMLInputElement;
    const nextInput = input.nextElementSibling as HTMLInputElement;
    const prevInput = input.previousElementSibling as HTMLInputElement;
    const currentPin = state.emailPin;

    if (e.key === "Backspace" && !prevInput) {
      currentPin[index] = "";
      setState({ ...state, emailPin: currentPin });

      return;
    }

    if (e.key === "Backspace" && prevInput) {
      if (
        nextInput &&
        (nextInput.value != "" || !nextInput.hasAttribute("disabled"))
      )
        return;

      currentPin[index] = "";
      setState({ ...state, emailPin: currentPin });

      input.setAttribute("disabled", "true");
      prevInput.focus();
      return;
    }

    if (/^[0-9]$/.test(e.key)) {
      currentPin[index] = e.key;
      setState({ ...state, emailPin: currentPin });

      if (nextInput && nextInput.hasAttribute("disabled")) {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.mainMessage}>Please check your email &#128076;</h1>
      <h2 className={styles.subMessage}>{state.subMessage}</h2>
      <form onSubmit={(e) => handleVerifyEmailSubmit(e)}>
        <div className={styles.pinInput}>
          {state.emailPin.map((pin, index) =>
            pin != "" ? (
              <input
                key={index}
                id={"emailPin" + index}
                type="text"
                autoComplete="off"
                maxLength={1}
                disabled={state.isLoading}
                readOnly
                value={pin}
                onClick={(e) => e.preventDefault()}
                onChange={() => console.log()}
                onKeyUp={(e) => handleEmailPinKeyUp(e, index)}
              ></input>
            ) : (
              <input
                key={index}
                id={"emailPin" + index}
                autoFocus
                disabled={index > 0 || state.isLoading}
                type="text"
                autoComplete="off"
                maxLength={1}
                value={pin}
                onChange={() => console.log()}
                onKeyUp={(e) => handleEmailPinKeyUp(e, index)}
              ></input>
            )
          )}
        </div>
        {state.isLoading ? (
          <button className={styles.submit} disabled>
            <div className={styles.loader}>
              <div className={styles.loading}></div>
            </div>
          </button>
        ) : (
          <input className={styles.submit} type="submit" value="Verify"></input>
        )}
        <h4 className={styles.resendEmail} onClick={handleResendEmailPinClick}>
          Didn't receive an email? <a>Resend</a>
        </h4>
      </form>
    </main>
  );
};

export default VerifyEmailRegister;
