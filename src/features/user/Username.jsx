import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((store) => store.user.username);
  if (!username) return;
  return <div className="text-l hidden font-semibold md:block">{username}</div>;
}

export default Username;
