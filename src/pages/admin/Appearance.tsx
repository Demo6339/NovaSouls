import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Appearance = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home content page by default
    navigate('/admin/appearance/home/content', { replace: true });
  }, [navigate]);

  return null;
};

export default Appearance;