import { useNavigate } from "react-router-dom";

export default function NavButton({ to, children }) {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>{children}</button>;
}
