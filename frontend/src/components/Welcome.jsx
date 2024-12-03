
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle pt-4">
        Hello There ! <strong>{user && user.name}</strong>
      </h2>
    </div>
  );
};

export default Welcome;