import Login from "./Login.tsx";

interface AuthorizerProps {
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    }>
  >;
}

const Authorizer = ({ setUser }: AuthorizerProps) => {
  return <Login setUser={setUser}></Login>;
};

export default Authorizer;
