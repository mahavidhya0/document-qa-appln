from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import fitz  # PyMuPDF
import os
import faiss
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import Ollama
from langchain.chains.question_answering import load_qa_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploaded_docs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = None

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")  # Print the uploaded file name
    filepath = os.path.join(UPLOAD_DIR, file.filename)
    with open(filepath, "wb") as f:
        f.write(await file.read())
    text = extract_text_from_pdf(filepath)
    print(f"Extracted text: {text[:500]}")  # Print the first 500 characters of the extracted text
    docs = split_text(text)
    global vectorstore
    vectorstore = FAISS.from_documents(docs, embedding_model)
    print("Documents indexed successfully.")  # Confirm indexing
    return {"message": f"File {file.filename} uploaded and indexed."}

@app.post("/ask/")
async def ask_question(question: str = Form(...)):
    print(f"Received question: {question}")  # Print the received question
    if not vectorstore:
        print("No documents indexed.")  # Log if no documents are indexed
        return JSONResponse(content={"error": "No documents indexed"}, status_code=400)
    docs = vectorstore.similarity_search(question, k=3)
    print(f"Retrieved documents: {docs}")  # Print the retrieved documents
    llm = Ollama(model="mistral")
    chain = load_qa_chain(llm, chain_type="stuff")
    answer = chain.run(input_documents=docs, question=question)
    print(f"Generated answer: {answer}")  # Print the generated answer
    return {"answer": answer}

def extract_text_from_pdf(filepath):
    doc = fitz.open(filepath)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def split_text(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = splitter.create_documents([text])
    return docs
