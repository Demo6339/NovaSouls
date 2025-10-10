import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminEvents = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to activities page by default
    navigate('/admin/events/activities', { replace: true });
  }, [navigate]);

  return null;
};

export default AdminEvents;
