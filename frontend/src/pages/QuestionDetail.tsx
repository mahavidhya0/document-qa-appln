
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import AnswerCard from '@/components/AnswerCard';
import DocumentViewer from '@/components/DocumentViewer';
import { Button } from '@/components/ui/button';
import {
  ThumbsUp,
  ThumbsDown,
  BookmarkPlus,
  Share2,
  BookOpen,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const questionData = {
  id: '1',
  title: 'How do I implement JWT authentication in a React app?',
  content: `
    <p>I'm building a React application that needs to authenticate users against my backend API. 
    I've decided to use JWT (JSON Web Tokens) for authentication, but I'm not sure about the best approach.</p>

    <p>Specifically, I have the following questions:</p>

    <ul>
      <li>Where should I store the JWT token? localStorage, cookies, or memory?</li>
      <li>How do I handle token expiration and refreshing?</li>
      <li>What's the best way to protect routes that require authentication?</li>
      <li>How can I include the token in all API requests automatically?</li>
    </ul>

    <p>I'd appreciate any code examples or best practices for implementing this in a production application.</p>
  `,
  tags: ['react', 'authentication', 'jwt'],
  votes: 42,
  views: 1204,
  askedBy: 'johndoe',
  askedAt: '2 days ago',
  answers: [
    {
      id: 'a1',
      content: `For JWT storage, httpOnly cookies are generally considered the most secure option because they protect against XSS attacks. localStorage is convenient but vulnerable to XSS.

For route protection, you can use React Router with a protected route component:

\`\`\`jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <Spinner />;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
\`\`\`

For API requests, use an axios interceptor:

\`\`\`jsx
axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  error => Promise.reject(error)
);
\`\`\``,
      answeredBy: 'securityexpert',
      answeredAt: '1 day ago',
      votes: 18,
      isAccepted: true,
    },
    {
      id: 'a2',
      content: `Another approach is to use the Context API to manage authentication state:

\`\`\`jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\``,
      answeredBy: 'reactchamp',
      answeredAt: '1 day ago',
      votes: 12,
    },
  ],
};

const relatedDocumentContent = `
# JWT Authentication in React Applications

## Introduction

JSON Web Tokens (JWT) provide a way to securely transmit information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

## Storage Options

There are several places where you can store JWTs in a browser:

1. **localStorage** - Simple but vulnerable to XSS attacks
2. **httpOnly Cookies** - More secure against XSS but vulnerable to CSRF
3. **Memory (React state)** - Secure but lost on page refresh

## Best Practices

### Token Storage

For production applications, httpOnly cookies are generally recommended:

\`\`\`javascript
// Setting the cookie on login
document.cookie = 'token=your_jwt_here; HttpOnly; Secure; SameSite=Strict';
\`\`\`

### Token Expiration

Use short-lived access tokens with longer-lived refresh tokens:

\`\`\`javascript
function checkTokenExpiration() {
  const token = getToken();
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    
    if (decodedToken.exp < currentTime) {
      // Token has expired, use refresh token to get a new one
      refreshToken();
    }
  }
}
\`\`\`

### Route Protection

Create a higher-order component or custom hook to protect routes:

\`\`\`jsx
function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}
\`\`\`

### API Requests

Use axios interceptors to automatically attach the token to requests:

\`\`\`javascript
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
\`\`\`
`;

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('question');
  const [newAnswer, setNewAnswer] = useState('');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-4">{questionData.title}</h1>
            
            <div className="flex gap-4 text-sm text-gray-500 mb-6">
              <div>Asked {questionData.askedAt}</div>
              <div>Viewed {questionData.views} times</div>
            </div>
            
            <div className="border rounded-lg mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="question"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-brand-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Question
                  </TabsTrigger>
                  <TabsTrigger
                    value="document"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-brand-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Related Document
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="question" className="p-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center pt-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="font-medium text-sm">{questionData.votes}</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <div className="mt-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: questionData.content }} />
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {questionData.tags.map(tag => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-500 flex justify-end">
                        Asked by <a href="#" className="text-brand-600 ml-1">{questionData.askedBy}</a>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="document" className="p-0 border-0">
                  <div className="h-[500px]">
                    <DocumentViewer 
                      title="JWT Authentication in React" 
                      content={relatedDocumentContent} 
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{questionData.answers.length} Answers</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="text-sm border rounded p-1">
                    <option>Highest votes</option>
                    <option>Date (newest first)</option>
                    <option>Date (oldest first)</option>
                  </select>
                </div>
              </div>
              
              {questionData.answers.map((answer) => (
                <AnswerCard key={answer.id} {...answer} />
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Your Answer</h3>
              <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="min-h-[200px] mb-4"
              />
              <Button>Post Your Answer</Button>
            </div>
          </div>
          
          <div>
            <div className="border rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-brand-600" />
                Related Documents
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-brand-600 hover:underline">JWT Authentication Guide</a>
                </li>
                <li>
                  <a href="#" className="text-brand-600 hover:underline">React Security Best Practices</a>
                </li>
                <li>
                  <a href="#" className="text-brand-600 hover:underline">Modern Authentication Patterns</a>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-brand-600" />
                Related Questions
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-brand-600 hover:underline">How to handle refresh tokens in React?</a>
                </li>
                <li>
                  <a href="#" className="text-brand-600 hover:underline">Best practices for React authentication 2023</a>
                </li>
                <li>
                  <a href="#" className="text-brand-600 hover:underline">Securing API routes with JWT</a>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="font-medium mb-2 flex items-center gap-2 text-yellow-800">
                <AlertCircle className="h-4 w-4" />
                How to Ask
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>Summarize your problem in a clear title</li>
                <li>Describe what you've tried and what you expected</li>
                <li>Add relevant code as needed</li>
                <li>Proofread and use proper formatting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionDetail;
