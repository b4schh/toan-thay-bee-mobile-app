import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X, Check, AlertCircle, Clock, Send, Copy, Smartphone, Save, Cookie, Globe, Shield, Key } from 'lucide-react';

const ApiTestPage = () => {
    const [url, setUrl] = useState(process.env.REACT_APP_API_URL || "https://toanthaybeebackendnodejs-17993696118.asia-southeast1.run.app/api");
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState('{}');
    const [body, setBody] = useState('{}');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusCode, setStatusCode] = useState(null);
    const [responseTime, setResponseTime] = useState(null);
    const [responseHeaders, setResponseHeaders] = useState(null);
    const [isSafari, setIsSafari] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [userAgent, setUserAgent] = useState('');
    const [savedRequests, setSavedRequests] = useState([]);
    const [showSavedRequests, setShowSavedRequests] = useState(false);
    const [requestName, setRequestName] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [networkInfo, setNetworkInfo] = useState(null);
    const [cookies, setCookies] = useState([]);
    const [corsHeaders, setCorsHeaders] = useState(null);
    const [showLoginTest, setShowLoginTest] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginUrl, setLoginUrl] = useState(process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/v1/user/login` : 'https://toanthaybeebackendnodejs-17993696118.asia-southeast1.run.app/api/v1/user/login');
    const responseRef = useRef(null);

    useEffect(() => {
        // Detect Safari browser and iOS
        const ua = navigator.userAgent;
        setUserAgent(ua);
        const isSafariCheck = /^((?!chrome|android).)*safari/i.test(ua);
        const isIOSCheck = /iPad|iPhone|iPod/.test(ua) ||
                         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        setIsSafari(isSafariCheck);
        setIsIOS(isIOSCheck);

        // Load saved requests from localStorage
        const savedReqs = localStorage.getItem('savedApiRequests');
        if (savedReqs) {
            setSavedRequests(JSON.parse(savedReqs));
        }

        // Add viewport meta tag for better mobile experience
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.getElementsByTagName('head')[0].appendChild(meta);

        // Get network information if available
        if ('connection' in navigator) {
            const conn = navigator.connection;
            setNetworkInfo({
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                rtt: conn.rtt,
                saveData: conn.saveData
            });

            // Listen for connection changes
            conn.addEventListener('change', () => {
                setNetworkInfo({
                    effectiveType: conn.effectiveType,
                    downlink: conn.downlink,
                    rtt: conn.rtt,
                    saveData: conn.saveData
                });
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);
        setStatusCode(null);
        setResponseTime(null);
        setResponseHeaders(null);
        setCookies([]);
        setCorsHeaders(null);

        try {
            let parsedHeaders = {};
            try {
                parsedHeaders = JSON.parse(headers);
            } catch (err) {
                setError('Invalid headers JSON format');
                setLoading(false);
                return;
            }

            let parsedBody = {};
            try {
                if (method !== 'GET' && body.trim() !== '{}' && body.trim() !== '') {
                    parsedBody = JSON.parse(body);
                }
            } catch (err) {
                setError('Invalid body JSON format');
                setLoading(false);
                return;
            }

            const startTime = new Date().getTime();

            const config = {
                method: method,
                url: url,
                headers: parsedHeaders,
                data: method !== 'GET' ? parsedBody : undefined,
                withCredentials: true,
            };

            console.log('Request config:', config);

            const response = await axios(config);

            const endTime = new Date().getTime();
            setResponseTime(endTime - startTime);
            setStatusCode(response.status);
            setResponse(response.data);
            setResponseHeaders(response.headers);

            // Extract and display cookies
            extractCookies(document.cookie);

            // Extract CORS headers
            const corsRelatedHeaders = {
                'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'],
                'Access-Control-Allow-Credentials': response.headers['access-control-allow-credentials'],
                'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'],
                'Access-Control-Allow-Headers': response.headers['access-control-allow-headers']
            };
            setCorsHeaders(corsRelatedHeaders);
        } catch (err) {
            console.error('API Error:', err);
            setError(err.message);
            if (err.response) {
                setStatusCode(err.response.status);
                setResponse(err.response.data);
                setResponseHeaders(err.response.headers);
            }
        } finally {
            setLoading(false);
        }
    };

    const saveRequest = () => {
        if (!requestName.trim()) {
            setError('Please enter a name for this request');
            return;
        }

        const newRequest = {
            name: requestName,
            url,
            method,
            headers,
            body
        };

        const updatedRequests = [...savedRequests, newRequest];
        setSavedRequests(updatedRequests);
        localStorage.setItem('savedApiRequests', JSON.stringify(updatedRequests));
        setRequestName('');
        setError(null);
    };

    const loadRequest = (req) => {
        setUrl(req.url);
        setMethod(req.method);
        setHeaders(req.headers);
        setBody(req.body);
        setShowSavedRequests(false);
    };

    const deleteRequest = (index) => {
        const updatedRequests = savedRequests.filter((_, i) => i !== index);
        setSavedRequests(updatedRequests);
        localStorage.setItem('savedApiRequests', JSON.stringify(updatedRequests));
    };

    const scrollToResponse = () => {
        if (responseRef.current) {
            responseRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                setCopySuccess('Failed to copy');
            });
    };

    // Function to handle iOS-specific issues
    const handleIOSFocus = (e) => {
        if (isIOS) {
            // On iOS, scroll the page a bit to ensure the input is visible when keyboard appears
            setTimeout(() => {
                window.scrollTo(0, e.target.offsetTop - 100);
            }, 300);
        }
    };

    const extractCookies = (cookieString) => {
        if (!cookieString) return;

        const cookieList = [];
        const cookies = cookieString.split(';');

        cookies.forEach(cookie => {
            const parts = cookie.split('=');
            const name = parts[0].trim();
            const value = parts.length > 1 ? parts[1].trim() : '';
            const expires = getCookieExpiration(name);

            cookieList.push({ name, value, expires });
        });

        setCookies(cookieList);
    };

    const getCookieExpiration = (name) => {
        try {
            const cookieStore = document.cookie.split('; ');
            for (let i = 0; i < cookieStore.length; i++) {
                const cookie = cookieStore[i];
                if (cookie.indexOf(name + '=') === 0) {
                    // This is a simplification - actual cookie expiration is more complex
                    return 'Session cookie or unknown';
                }
            }
            return 'Unknown';
        } catch (error) {
            return 'Error getting expiration';
        }
    };

    const handleLoginTest = async () => {
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);
        setStatusCode(null);
        setResponseTime(null);
        setResponseHeaders(null);
        setCookies([]);
        setCorsHeaders(null);

        try {
            const startTime = new Date().getTime();

            const config = {
                method: 'POST',
                url: loginUrl,
                headers: { 'Content-Type': 'application/json' },
                data: { username, password },
                withCredentials: true,
            };

            console.log('Login request config:', config);

            const response = await axios(config);

            const endTime = new Date().getTime();
            setResponseTime(endTime - startTime);
            setStatusCode(response.status);
            setResponse(response.data);
            setResponseHeaders(response.headers);

            // Extract and display cookies
            extractCookies(document.cookie);

            // Extract CORS headers
            const corsRelatedHeaders = {
                'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'],
                'Access-Control-Allow-Credentials': response.headers['access-control-allow-credentials'],
                'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'],
                'Access-Control-Allow-Headers': response.headers['access-control-allow-headers']
            };
            setCorsHeaders(corsRelatedHeaders);

            scrollToResponse();
        } catch (err) {
            console.error('Login API Error:', err);
            setError(err.message);
            if (err.response) {
                setStatusCode(err.response.status);
                setResponse(err.response.data);
                setResponseHeaders(err.response.headers);

                // Even on error, check for CORS headers
                const corsRelatedHeaders = {
                    'Access-Control-Allow-Origin': err.response.headers['access-control-allow-origin'],
                    'Access-Control-Allow-Credentials': err.response.headers['access-control-allow-credentials'],
                    'Access-Control-Allow-Methods': err.response.headers['access-control-allow-methods'],
                    'Access-Control-Allow-Headers': err.response.headers['access-control-allow-headers']
                };
                setCorsHeaders(corsRelatedHeaders);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">API Test Tool for iPhone Safari</h1>

            {/* Browser Info */}
            <div className="mb-6 p-3 bg-white rounded-lg shadow">
                <div className="flex items-center mb-2">
                    <Smartphone size={18} className="mr-2 text-blue-500" />
                    <h2 className="font-semibold">Device Information:</h2>
                </div>
                <p className="text-sm break-words"><span className="font-medium">User Agent:</span> {userAgent}</p>
                <p className="mt-1"><span className="font-medium">Detected as Safari:</span> {isSafari ? 'Yes' : 'No'}</p>
                <p className="mt-1"><span className="font-medium">Detected as iOS:</span> {isIOS ? 'Yes' : 'No'}</p>

                {networkInfo && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                        <h3 className="font-medium mb-1">Network Information:</h3>
                        <p className="text-sm">Connection Type: {networkInfo.effectiveType}</p>
                        <p className="text-sm">Downlink: {networkInfo.downlink} Mbps</p>
                        <p className="text-sm">RTT: {networkInfo.rtt} ms</p>
                        <p className="text-sm">Data Saver: {networkInfo.saveData ? 'On' : 'Off'}</p>
                    </div>
                )}
            </div>

            {/* Login Test Section */}
            <div className="mb-6">
                <button
                    onClick={() => setShowLoginTest(!showLoginTest)}
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 flex items-center justify-center gap-2"
                >
                    <Key size={18} />
                    {showLoginTest ? 'Hide Login Test' : 'Show Login Test (Cookie & CORS Check)'}
                </button>

                {showLoginTest && (
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <div className="flex items-center mb-3">
                            <Cookie size={18} className="mr-2 text-green-500" />
                            <h2 className="font-semibold">Login Test (Checks Cookies & CORS)</h2>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginUrl">
                                Login API URL
                            </label>
                            <input
                                id="loginUrl"
                                type="text"
                                value={loginUrl}
                                onChange={(e) => setLoginUrl(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter login API URL"
                                onFocus={handleIOSFocus}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter username"
                                onFocus={handleIOSFocus}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter password"
                                onFocus={handleIOSFocus}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleLoginTest}
                            disabled={loading}
                            className={`flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Key size={18} />
                            {loading ? 'Testing...' : 'Test Login & Check Cookies'}
                        </button>
                    </div>
                )}
            </div>

            {/* Saved Requests */}
            <div className="mb-6">
                <button
                    onClick={() => setShowSavedRequests(!showSavedRequests)}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
                >
                    {showSavedRequests ? 'Hide Saved Requests' : 'Show Saved Requests'}
                </button>

                {showSavedRequests && (
                    <div className="bg-white p-3 rounded-lg shadow">
                        <h2 className="font-semibold mb-2">Saved Requests:</h2>
                        {savedRequests.length === 0 ? (
                            <p className="text-gray-500">No saved requests</p>
                        ) : (
                            <div className="max-h-60 overflow-y-auto">
                                {savedRequests.map((req, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 border-b">
                                        <div>
                                            <p className="font-medium">{req.name}</p>
                                            <p className="text-xs text-gray-500">{req.method} {req.url}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => loadRequest(req)}
                                                className="bg-green-500 text-white p-1 rounded"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteRequest(index)}
                                                className="bg-red-500 text-white p-1 rounded"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                        API URL
                    </label>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter API URL"
                        onFocus={handleIOSFocus}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="method">
                        Method
                    </label>
                    <select
                        id="method"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="headers">
                        Headers (JSON format)
                    </label>
                    <textarea
                        id="headers"
                        value={headers}
                        onChange={(e) => setHeaders(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="3"
                        placeholder='{"Content-Type": "application/json"}'
                        onFocus={handleIOSFocus}
                    />
                </div>

                {method !== 'GET' && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                            Request Body (JSON format)
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="5"
                            placeholder='{"key": "value"}'
                            onFocus={handleIOSFocus}
                        />
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Send size={18} />
                        {loading ? 'Sending...' : 'Send Request'}
                    </button>

                    <button
                        type="button"
                        onClick={scrollToResponse}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <AlertCircle size={18} />
                        View Response
                    </button>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                        placeholder="Name this request"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        onFocus={handleIOSFocus}
                    />
                    <button
                        type="button"
                        onClick={saveRequest}
                        className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <Save size={16} /> Save
                    </button>
                </div>
            </form>

            {loading && (
                <div className="text-center py-4">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div ref={responseRef}>
                {statusCode && (
                    <div className={`mb-4 p-3 rounded-lg shadow ${statusCode >= 200 && statusCode < 300 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <div className="flex items-center">
                            <div className={`mr-2 p-1 rounded-full ${statusCode >= 200 && statusCode < 300 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                {statusCode >= 200 && statusCode < 300 ?
                                    <Check size={16} className="text-white" /> :
                                    <AlertCircle size={16} className="text-white" />}
                            </div>
                            <h2 className="font-semibold">Status: {statusCode}</h2>
                        </div>
                        {responseTime && (
                            <div className="flex items-center mt-1">
                                <Clock size={16} className="mr-1 text-gray-500" />
                                <p>Response Time: {responseTime}ms</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* CORS Headers Section */}
            {corsHeaders && (
                <div className="mb-4 bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <Globe size={18} className="mr-2 text-blue-500" />
                            <h2 className="font-semibold">CORS Headers:</h2>
                        </div>
                        <button
                            onClick={() => copyToClipboard(JSON.stringify(corsHeaders, null, 2))}
                            className="flex items-center text-blue-500 hover:text-blue-700"
                        >
                            <Copy size={14} className="mr-1" /> Copy
                        </button>
                    </div>
                    <div className="bg-gray-100 p-3 rounded">
                        <div className="mb-2">
                            <span className="font-medium">Access-Control-Allow-Origin: </span>
                            <span className={corsHeaders['Access-Control-Allow-Origin'] ? 'text-green-600' : 'text-red-600'}>
                                {corsHeaders['Access-Control-Allow-Origin'] || 'Not present'}
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="font-medium">Access-Control-Allow-Credentials: </span>
                            <span className={corsHeaders['Access-Control-Allow-Credentials'] ? 'text-green-600' : 'text-red-600'}>
                                {corsHeaders['Access-Control-Allow-Credentials'] || 'Not present'}
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="font-medium">Access-Control-Allow-Methods: </span>
                            <span className={corsHeaders['Access-Control-Allow-Methods'] ? 'text-green-600' : 'text-gray-600'}>
                                {corsHeaders['Access-Control-Allow-Methods'] || 'Not present'}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">Access-Control-Allow-Headers: </span>
                            <span className={corsHeaders['Access-Control-Allow-Headers'] ? 'text-green-600' : 'text-gray-600'}>
                                {corsHeaders['Access-Control-Allow-Headers'] || 'Not present'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Cookies Section */}
            {cookies.length > 0 && (
                <div className="mb-4 bg-white p-3 rounded-lg shadow">
                    <div className="flex items-center mb-2">
                        <Cookie size={18} className="mr-2 text-green-500" />
                        <h2 className="font-semibold">Cookies Set:</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 px-3 text-sm font-medium">Name</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium">Value</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium">Expires</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cookies.map((cookie, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="py-2 px-3 text-sm">{cookie.name}</td>
                                        <td className="py-2 px-3 text-sm">{cookie.value.length > 20 ? `${cookie.value.substring(0, 20)}...` : cookie.value}</td>
                                        <td className="py-2 px-3 text-sm">{cookie.expires}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {responseHeaders && (
                <div className="mb-4 bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <Shield size={18} className="mr-2 text-blue-500" />
                            <h2 className="font-semibold">All Response Headers:</h2>
                        </div>
                        <button
                            onClick={() => copyToClipboard(JSON.stringify(responseHeaders, null, 2))}
                            className="flex items-center text-blue-500 hover:text-blue-700"
                        >
                            <Copy size={14} className="mr-1" /> Copy
                        </button>
                    </div>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                        {JSON.stringify(responseHeaders, null, 2)}
                    </pre>
                </div>
            )}

            {response && (
                <div className="bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-semibold">Response:</h2>
                        <button
                            onClick={() => copyToClipboard(typeof response === 'object' ? JSON.stringify(response, null, 2) : response)}
                            className="flex items-center text-blue-500 hover:text-blue-700"
                        >
                            <Copy size={14} className="mr-1" /> Copy
                        </button>
                    </div>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                        {typeof response === 'object' ? JSON.stringify(response, null, 2) : response}
                    </pre>
                </div>
            )}

            {copySuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    {copySuccess}
                </div>
            )}
        </div>
    );
};

export default ApiTestPage;
