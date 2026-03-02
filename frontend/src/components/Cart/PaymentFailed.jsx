import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Thanh toán thất bại</h2>
      <button onClick={() => navigate("/checkout")}>
        Thử lại
      </button>
    </div>
  );
}

export default PaymentFailed;