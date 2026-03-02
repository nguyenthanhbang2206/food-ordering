import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCart } from "../State/Cart/Action";


function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteCart());
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Thanh toán thành công</h2>

      <button
        className="px-5 py-5 bg-blue-300 mt-20 mr-20"
        onClick={() => navigate("/myProfile/orders")}
      >
        Xem danh sách đơn hàng
      </button>

      <button
        className="px-5 py-5 bg-blue-300 mt-20"
        onClick={() => navigate("/")}
      >
        Về trang chủ
      </button>
    </div>
  );
}

export default PaymentSuccess;