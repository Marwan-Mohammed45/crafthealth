import React, { useState } from "react";
import AIResponse from "./AIResponse";
import UserInput from "./UserInput";
import axios from "axios";
import bgImage from '../../assets/dashboard/dash.png'
const api = axios.create({
  baseURL: "",
});

function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message immediately
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setInput("")
    try {
      const res = await api.post("/predict", { user_input: input }, { headers: { "Content-Type": "application/json" } } );
      const aiMessage = { sender: "AI", text: res.data };
      setMessages((prev) => [...prev, aiMessage]);
      console.log(res.data)
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "Error: Could not get response" },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className=" min-h-screen w-full flex flex-col bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="flex-1 mt-5 px-2 pb-24 overflow-y-auto">
        {messages.map((msg, idx) =>
          msg.sender === "user" ? (
            <UserInput key={idx} input={msg.text} />
          ) : (
            <AIResponse key={idx} text={msg.text} />
          )
        )}
        {loading && <AIResponse text="Thinking..." />}
      </div>

      <form
        onSubmit={handleSend}
        className="sticky z-[1] bottom-0 left-0 w-full flex justify-center  mt-10 py-4 z-50"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Type your message..."
          className="w-full animate-fade-in  sm:max-w-3xl px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition-all z-[-1] duration-200 "
        />
      </form>
    </div>
  );
}

export default AIPage;
