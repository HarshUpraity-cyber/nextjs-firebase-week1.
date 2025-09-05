"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Message = { sender: "user" | "ai"; text: string };
type Quiz = { question: string; options: string[]; answer: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [score, setScore] = useState<string | null>(null);

  // API call helper
  const callAPI = async (endpoint: string, payload = {}) => {
    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, ...payload }),
    });
    return res.json();
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
  };

  const handleAction = async (action: "summarize" | "explain" | "quiz") => {
    const data = await callAPI(action);

    if (action === "quiz") {
      setQuiz(data.quiz);
      setMessages((prev) => [...prev, { sender: "ai", text: "Here’s your quiz!" }]);
    } else {
      setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
    }
  };

  const handleQuizAnswer = (option: string, correct: string) => {
    setScore(option === correct ? "✅ Correct!" : "❌ Wrong!");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 space-y-4">
      {/* Chat Window */}
      <div className="w-full h-96 border rounded-2xl p-4 overflow-y-auto bg-white shadow-sm">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-2xl ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex w-full gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white rounded-xl px-4 py-2"
        >
          Send
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          className="bg-gray-200 px-4 py-2 rounded-xl"
          onClick={() => handleAction("summarize")}
        >
          Summarize
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded-xl"
          onClick={() => handleAction("explain")}
        >
          Explain
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded-xl"
          onClick={() => handleAction("quiz")}
        >
          Quiz
        </button>
      </div>

      {/* Quiz Card */}
      {quiz && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white border rounded-2xl shadow-lg p-4"
        >
          <h3 className="font-bold mb-2">{quiz.question}</h3>
          <div className="grid grid-cols-2 gap-2">
            {quiz.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuizAnswer(opt, quiz.answer)}
                className="border rounded-xl px-3 py-2 hover:bg-blue-100"
              >
                {opt}
              </button>
            ))}
          </div>
          {score && <p className="mt-2 font-medium">{score}</p>}
        </motion.div>
      )}
    </div>
  );
}
