import React, { useState } from 'react';
import axios from 'axios';

const NvidiaAIChat = () => {
    const [userInput, setUserInput] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setApiResponse(''); 
        try {
            const options = {
                method: 'POST',
                url: 'https://integrate.api.nvidia.com/v1/chat/completions',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Bearer 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'
                }
            };

            const response = await axios.request(options)
            setApiResponse(response.data.choices[0].message.content);
        } catch (err) {
            setError(err);
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>NVIDIA AI Chat</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your prompt here..."
                />
                <button type="submit">Submit</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {apiResponse && (
                <div>
                    <h2>Response:</h2>
                    <pre>{apiResponse}</pre>
                </div>
            )}
        </div>
    );
};

export default NvidiaAIChat;