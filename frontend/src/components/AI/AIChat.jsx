import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

export const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
      data: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Khôi phục chat từ localStorage khi load lại trang
  useEffect(() => {
    const savedChat = localStorage.getItem("ai_chat_history");
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  }, []);

  // ✅ Mỗi khi messages thay đổi, lưu lại localStorage
  useEffect(() => {
    localStorage.setItem("ai_chat_history", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/ai/chat`,
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ Nếu res.data.message chứa ```json thì cắt ra
      let botText = res.data.message;
      if (botText?.includes("```json")) {
        const jsonPart = botText.match(/```json([\s\S]*?)```/);
        if (jsonPart) {
          try {
            const parsed = JSON.parse(jsonPart[1]);
            botText = parsed.message || botText;
          } catch {
            // ignore parse error
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botText || "Tôi là AI, tôi sẽ trả lời bạn sớm nhất!",
          data: res.data.data || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
          data: [],
        },
      ]);
    }

    setLoading(false);
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6E6FA] to-white flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col h-[80vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-[#2563EB]">AI Chatbot</h2>
          <a
            href="/"
            className="text-[#2563EB] hover:underline font-semibold text-sm"
          >
            Trang chủ
          </a>
        </div>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#f7f5ff]">
          {messages.map((msg, idx) => (
            <div key={idx}>
              <div
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow text-base max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-[#2563EB] text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {/* ✅ Hiển thị danh sách món ăn nếu có */}
              {msg.sender === "bot" && msg.data && msg.data.length > 0 && (
                <ul className="ml-6 mt-2 space-y-2">
                  {msg.data.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 shadow"
                    >
                      <span className="text-[#2563EB] font-semibold">•</span>
                      <span className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        {" - "}
                        <span className="text-green-700 font-semibold">
                          {item.price} đ
                        </span>
                        {" - "}
                        <span className="text-gray-500">{item.cuisine}</span>
                      </span>
                      <button
                        className="bg-[#2563EB] text-white px-3 py-1 rounded hover:bg-[#431a9e] text-xs font-semibold"
                        onClick={() => navigate(`/food/${item.id}`)}
                      >
                        Xem chi tiết
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl shadow bg-gray-200 text-gray-800">
                Đang trả lời...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <form
          onSubmit={sendMessage}
          className="flex items-center px-6 py-4 border-t gap-2 bg-white"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-[#2563EB]"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
            maxLength={500}
          />
          <button
            type="submit"
            className="bg-[#2563EB] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#431a9e] transition"
            disabled={loading || !input.trim()}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};
