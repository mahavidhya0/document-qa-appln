import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Send, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

const DocumentQA = () => {
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaHistory, setQaHistory] = useState<{ question: string; answer: string }[]>([]);
  const [uploading, setUploading] = useState(false); // Separate state for upload
  const [asking, setAsking] = useState(false); // Separate state for asking
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Get the query from the URL when the page loads
  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setQuestion(queryParam);
      handleAsk(queryParam);
    }
  }, [searchParams]);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setUploading(true); // Use uploading state
      const formData = new FormData();
      formData.append("file", file);
      
      await axios.post("http://localhost:8000/upload/", formData);
      toast.success("Document uploaded and indexed successfully!");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload document. Please try again.");
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  const handleAsk = async (customQuestion?: string) => {
    const questionToAsk = customQuestion || question;
    
    if (!questionToAsk.trim()) {
      toast.error("Please enter a question");
      return;
    }

    try {
      setAsking(true); // Use asking state
      const formData = new FormData();
      formData.append("question", questionToAsk);

      const res = await axios.post("http://localhost:8000/ask/", formData);
      const newAnswer = res.data.answer;

      setAnswer(newAnswer);

      // Add the question and answer to the history
      setQaHistory((prevHistory) => [...prevHistory, { 
        question: questionToAsk, 
        answer: newAnswer 
      }]);
      
      // Only clear the question input if it wasn't from URL params
      if (!customQuestion) {
        setQuestion("");
      }
    } catch (error) {
      console.error("Error during request:", error);
      toast.error("Failed to fetch the answer. Please try again.");
    } finally {
      setAsking(false); // Reset asking state
    }
  };

  // Handle Enter key press in question input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !asking) {
      handleAsk();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-brand-800">Document Q&A</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFile(e.target.files[0]);
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleUpload} disabled={uploading || !file}>
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Upload PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Ask a question about your document..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10 flex-1"
                        disabled={asking}
                      />
                    </div>
                    <Button onClick={() => handleAsk()} disabled={asking || !question.trim()}>
                      {asking ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      Ask
                    </Button>
                  </div>

                  {asking && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
                      <span className="ml-3 text-brand-600 font-medium">Processing your question...</span>
                    </div>
                  )}

                  {answer && !asking && (
                    <div className="border-l-4 border-brand-400 pl-4 py-3 mt-4 bg-gray-50 rounded">
                      <h3 className="font-medium text-lg mb-2">Answer</h3>
                      <p className="text-gray-700 whitespace-pre-line">{answer}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* <div className="mt-8">
              <iframe
                src="https://copilotstudio.microsoft.com/environments/Default-3fd2e3ca-0fbb-4418-859f-474ae53db1ce/bots/crc51_techOilAssist/webchat?__version__=2"
                frameBorder="0"
                className="w-full h-[500px] border rounded-lg"
                title="Embedded Webchat"
              ></iframe>
            </div> */}
            <div>
            <Card>
              <CardHeader>
                <CardTitle>Q&A History</CardTitle>
              </CardHeader>
              <CardContent>
                {qaHistory.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {qaHistory.map((qa, index) => (
                      <div 
                        key={index} 
                        className="border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <p className="font-medium text-brand-700 mb-1">Q: {qa.question}</p>
                        <p className="text-gray-700 text-sm">A: {qa.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Ask questions to see history here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentQA;
