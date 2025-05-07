// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [qaHistory, setQaHistory] = useState([]); // State to store all questions and answers
//   const [loading, setLoading] = useState(false); // State to manage loader

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("file", file);
//     await axios.post("http://localhost:8000/upload/", formData);
//     alert("Uploaded and indexed!");
//   };

//   const handleAsk = async () => {
//     try {
//       setLoading(true); // Show loader
//       const formData = new FormData();
//       formData.append("question", question);

//       const res = await axios.post("http://localhost:8000/ask/", formData);
//       const newAnswer = res.data.answer;

//       setAnswer(newAnswer);

//       // Add the question and answer to the history
//       setQaHistory((prevHistory) => [...prevHistory, { question, answer: newAnswer }]);
//     } catch (error) {
//       console.error("Error during request:", error);
//       alert("Failed to fetch the answer. Please try again.");
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };

//   const [showIframe, setShowIframe] = useState(false); // State to toggle iframe visibility

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Document Q&A</h2>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload PDF</button>
//       <hr />
//       <input
//         type="text"
//         placeholder="Ask a question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         style={{ width: 300 }}
//       />
//       <button onClick={handleAsk} disabled={loading}>
//         {loading ? "Loading..." : "Ask"}
//       </button>
//       {loading && (
//         <div style={{ marginTop: 20, color: "blue", fontWeight: "bold" }}>
//           Loading... Please wait.
//         </div>
//       )}
//       <div style={{ marginTop: 20 }}>
//         <strong>Question:</strong>
//         <p>{question}</p>
//         <div style={{ marginTop: 20 }}>
//           {(!loading && qaHistory.length > 0) && (
//             <>
//               <strong>Answer:</strong>
//               <p>{answer}</p>
//             </>
//           )}
//         </div>
//       </div>
//       <hr />
//       <h3>Q&A History</h3>
//       <ul>
//         {qaHistory.map((qa, index) => (
//           <li key={index}>
//             <strong>Q:</strong> {qa.question} <br />
//             <strong>A:</strong> {qa.answer}
//           </li>
//         ))}
//       </ul>
//       <hr />
//           <iframe
//             src="https://copilotstudio.microsoft.com/environments/Default-3fd2e3ca-0fbb-4418-859f-474ae53db1ce/bots/crc51_techOilAssist/webchat?__version__=2"
//             frameBorder="0"
//             style={{ width: "100%", height: "500px"}}
//             title="Embedded Webchat"
//           ></iframe>
//     </div>
//   );
// }

// export default App;
