import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Showdown from "showdown";

const JarvisAI = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyCVYbRztmqUamxjghxQYoqXTmwGnRD4Z7Q");

    const [image, setImage] = useState("");
    const [input, setInput] = useState("");
    const [imageInlineData, setImageInlineData] = useState(null);
    const [aiResponse, setAiResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!input && !imageInlineData) return;
        setLoading(true);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const content = input ? [input] : [];
            if (imageInlineData) content.push(imageInlineData);

            const result = await model.generateContent(content);
            const response = await result.response.text();

            setAiResponse(response);
        } catch (error) {
            console.error("AI Error:", error);
        } finally {
            setLoading(false);
            setInput("");
            setImage("");
            setImageInlineData(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);

        const inlineData = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.readAsDataURL(file);
        });

        inlineData.then((data) =>
            setImageInlineData({ inlineData: { data, mimeType: file.type } })
        );
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Jarvis AI</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Interact with Jarvis using text or image inputs to get AI-generated insights.
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Ask Jarvis something..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading || (!input && !imageInlineData)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </div>

                <div className="mt-6">
                    {aiResponse ? (
                        <div className="p-4 bg-gray-50 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-700">Jarvis' Response:</h2>
                            <p className="text-gray-800 mt-2">{aiResponse}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No response yet.</p>
                    )}
                </div>

                {image && (
                    <div className="mt-4">
                        <h2 className="text-sm font-semibold text-gray-700">Uploaded Image:</h2>
                        <img
                            src={image}
                            alt="Uploaded Preview"
                            className="w-full h-auto rounded-lg shadow mt-2"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default JarvisAI;
