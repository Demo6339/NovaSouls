import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to menu page by default
    navigate('/admin/products/menu', { replace: true });
  }, [navigate]);

  return null;
};

export default AdminProducts;
