import { useState, useEffect } from "react";
import styles from "./VerifyEmailForgotPassword.module.css";
import AuthService from "./AuthService";

interface VerfiyEmailProps {
  sharedState: {
    mainMessage: string;
    subMessage: string;
    email: string;
    emailNeedsVerified: boolean;
    emailExists: boolean;
    emailVerified: boolean;
    password: string;
    passwordConfirm: string;
    isLoading: boolean;
  };

  setSharedState: React.Dispatch<
    React.SetStateAction<{
      mainMessage: string;
      subMessage: string;
      email: string;
      emailNeedsVerified: boolean;
      emailExists: boolean;
      emailVerified: boolean;
      password: string;
      passwordConfirm: string;
      isLoading: boolean;
    }>
  >;
}

const VerifyEmailForgotPassword = ({
  sharedState,
  setSharedState,
}: VerfiyEmailProps) => {
  const [state, setState] = useState({
    emailPin: ["", "", "", "", "", ""],
    isLoading: false,
    subMessage: `Sending a 6 digit pin to ${sharedState.email}`,
    pin: "",
  });

  const sendPinToEmail = async () => {
    setState({ ...state, isLoading: true });
    const startTime = Date.now();

    const pin = Math.floor(100000 + Math.random() * 900000);

    await AuthService.sendPinToEmail(sharedState.email, String(pin));

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1500 - elapsedTime);

    setTimeout(() => {
      setState({
        ...state,
        isLoading: false,
        subMessage: `Pin sent to ${sharedState.email}`,
        pin: String(pin),
      });
    }, remainingTime);
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

    setTimeout(() => {
      setState({ ...state, isLoading: false });

      if (!sharedState.emailExists) {
        setState({
          ...state,
          emailPin: ["", "", "", "", "", ""],

          isLoading: false,
          subMessage: "Invalid pin.  Please try again.",
        });
      } else {
        if (pinInput === state.pin) {
          setState({
            ...state,
            isLoading: true,
            subMessage: "Success!  You're ready for a new password",
          });

          setTimeout(() => {
            setState({ ...state, isLoading: false });
            setSharedState({
              ...sharedState,
              mainMessage: "Nice, you made it!",
              subMessage: "Enter your new password below",
              emailNeedsVerified: false,
              emailVerified: true,
            });
          }, 1500);
        }
      }
    }, 1000);
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

export default VerifyEmailForgotPassword;
