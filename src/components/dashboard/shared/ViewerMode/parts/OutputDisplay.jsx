import { BiCopy, BiSolidCopy, BiSolidMessageSquareError } from "react-icons/bi";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { useData } from "../../../../context/DataContext";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { converter } from "../../../../../common/config";
import "../../../../../chat.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const OutputDisplay = ({ output, isOutputLoading, handleCopy, copied }) => {
    const { isErrorOccured, setisErrorOpen, setErrorSuggesion, isErrorOpen, setisGenerating, errorSuggesion, isGenerating, isFullScreen, editorContent, language } = useData();
    const container = document.getElementById("codespace");
    const handleErrorDegugging = async () => {
        setisGenerating(true);

        if (errorSuggesion) {
            setisGenerating(false);
            setisErrorOpen(true);
            return;
        }

        try {
            const history = [
                {
                    role: "user",
                    parts: [
                        {
                            text: '{\n    code:"import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        VStack {\n            Text("Hello, world!")\n                .padding()\n        }\n        .background(Color.gray)\n    }\n}\n\nstruct ContentView_Previews: PreviewProvider {\n    static var previews: some View {\n        ContentView()\n    }\n}",\nerror:"Error:\nfile0.code:1:8: error: no such module \'SwiftUI\'\nimport SwiftUI\n^",\nlanguage:"Swift"\n}',
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "The error \"no such module 'SwiftUI'\" in your Swift code indicates that the compiler cannot find the SwiftUI framework.  This is a common issue stemming from missing or incorrect project configuration. SwiftUI is a framework, not a built-in part of the Swift language itself.\n\n**Root Cause:**  Your Xcode project isn't properly linked to the SwiftUI framework. This can happen for several reasons:\n\n* **Missing Framework Import:** While you have `import SwiftUI`, Xcode needs to know where to find this framework. This is usually handled automatically when creating a SwiftUI project, but might be missing if you're working with a legacy project or have manually altered project settings.\n* **Incorrect Project Setup:**  Ensure your project is set up correctly for SwiftUI development. Check the project's build settings and targets to confirm the SwiftUI framework is included in the linked frameworks and libraries.\n* **Xcode Version:** SwiftUI requires a compatible Xcode version. Check that you're using a recent version that supports SwiftUI.\n\n**Fixes:**\n\n1. **Create a New SwiftUI Project:** The simplest solution is often to create a new SwiftUI project in Xcode. This ensures the correct frameworks and settings are automatically configured.  Then, carefully move your code into the new project.\n\n2. **Manually Add SwiftUI Framework:**  If creating a new project isn't feasible, in Xcode, go to your project settings, select the target, navigate to \"Frameworks, Libraries, and Embedded Content,\" and add the SwiftUI framework.\n\n3. **Clean and Rebuild:** After making any changes, perform a \"Clean Build Folder\" (Product > Clean Build Folder) followed by a rebuild to ensure Xcode refreshes its dependencies.\n\n\nBy addressing the framework linkage, the compiler will be able to locate SwiftUI and your code will compile successfully.\n",
                        },
                    ],
                },
                {
                    role: "user",
                    parts: [
                        {
                            text: '{\n    code:"// Getting Started with Java: A Simple "Hello, World!" Program\n// Time Complexity: O(1)\n// Space Complexity: O(1)\npublic class HelloWorld {\n\n    public static int addTwoValues(int a, int b) {\n        return a + b; //No optimization needed for simple addition\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n         sum = addTwoValues(5,3); //Example usage of addTwoValues\n        System.out.println("The sum is: " + sum); //No changes needed here, already efficient\n    }\n}",\nerror:"Error:\nfile0.code.java:12: error: cannot find symbol\nsum = addTwoValues(5,3); //Example usage of addTwoValues\n^\nsymbol: variable sum\nlocation: class HelloWorld\nfile0.code.java:13: error: cannot find symbol\nSystem.out.println("The sum is: " + sum); //No changes needed here, already efficient\n^\nsymbol: variable sum\nlocation: class HelloWorld\n2 errors\nerror: compilation failed",\nlanguage:"java"\n}',
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: 'The Java code has a compilation error because the variable `sum` is used without being declared.  The `addTwoValues` function calculates the sum, but the result isn\'t stored or used.\n\n**Root Cause:** The `sum` variable is referenced in the `main` method without a prior declaration.  Java requires variables to be declared before use.\n\n**Solution:**  Declare the `sum` variable before using it.  Since `addTwoValues` returns an `int`, `sum` should also be an `int`.\n\n**Corrected Code:**\n\n```java\npublic class HelloWorld {\n\n    public static int addTwoValues(int a, int b) {\n        return a + b; \n    }\n\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        int sum = addTwoValues(5,3); // Declare sum and assign the result\n        System.out.println("The sum is: " + sum); \n    }\n}\n```\n\nThis corrected code declares an integer variable named `sum`, assigns the return value of `addTwoValues` to it, and then uses it in the `println` statement.  This eliminates the "cannot find symbol" error.  The code will now compile and run correctly.\n',
                        },
                    ],
                },
            ];

            const CodeSetings = {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "application/plain",
            };

            const AI = new GoogleGenerativeAI(
                "AIzaSyDmmnVfs5qtu9NRGhLWphp-hiK4MlGhmz8"
            );
            const chat = AI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction:
                    'You’re a skilled software engineer with extensive experience in code optimization and performance analysis. Your expertise lies in evaluating algorithms for both space and time complexity, and you have a knack for rewriting code to enhance efficiency without compromising functionality.\nYour task is to analyze the provided code, evaluate its current space and time complexity, and rewrite it to achieve a more optimized version by reducing unnecessary resource usage and minimizing execution time.\nPlease ensure to clearly state the initial complexity and the new complexity of the rewritten code. Include comments in the code explaining the optimizations made and how they impact performance. Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}',
            }).startChat({
                setting: CodeSetings,
                history,
            });
            const result = await chat.sendMessage(
                JSON.stringify({
                    code: editorContent,
                    error: output,
                    language: language,
                })
            );
            const data = await result.response.text();
            setErrorSuggesion(data);
            setisErrorOpen(true);
        } catch (error) {
            console.error("Error optimizing code:", error);
        } finally {
            setisGenerating(false);
        }
    };
    return (
        <div className={`bg-black/90 overflow-auto ${isFullScreen ? 'h-[30vh]' : 'h-[25vh]'} mt-3 rounded-lg`}>
            <div className="px-3 flex justify-between items-center pt-2 mb-2">
                <h1 className="text-lg font-medium text-gray-100">Output:</h1>
                <div className="flex items-center justify-center gap-3 me-3">
                    {(output && isErrorOccured) &&
                        <div className="">
                            <button disabled={isGenerating} onClick={() => handleErrorDegugging()} className="cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all" >
                                <VscLightbulbSparkle className="text-xl text-white" />
                            </button>
                            <Dialog.Root open={isErrorOpen} >
                                <Dialog.Portal container={container} >
                                    <Dialog.Overlay onClick={() => { setisErrorOpen(false) }} className="fixed inset-0 bg-black/5 data-[state=open]:animate-overlayShow" />
                                    <Dialog.Content className="fixed right-[7.8rem] bottom-[10%] max-h-[400px] h-[400px] w-[90vw] max-w-[450px] border rounded-md bg-white shadow focus:outline-none data-[state=open]:animate-contentShow">
                                        <div className="h-[400px] overflow-auto rounded-lg w-full bg-gray-100 px-[25px] pt-[10px] pb-[25px]">
                                            <h1 className="text-xl font-semibold mb-3 inline-flex items-center justify-center gap-2 text-gray-600"><BiSolidMessageSquareError /> Error Explanation</h1>
                                            <div className="jarvis no-tailwindcss" dangerouslySetInnerHTML={{ __html: converter.makeHtml(errorSuggesion) }} />
                                        </div>
                                        {/* <div class="absolute bottom-[26%] mt-[6.5rem] right-2 z-[3] transform origin-[100%_0] translate-y-1/2 -rotate-90 translate-x-1/2">
                                            <svg
                                                class="block fill-gray-300 "
                                                width="16"
                                                height="8"
                                                viewBox="0 0 30 10"
                                                preserveAspectRatio="none"
                                            >
                                                <polygon points="0,0 30,0 15,10" />
                                            </svg>
                                        </div> */}
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </div>
                    }
                    {output && (
                        <button onClick={handleCopy}>
                            {copied ? <BiSolidCopy className="text-gray-200 text-sm" /> : <BiCopy className="text-gray-200 text-sm" />}
                        </button>
                    )}
                </div>
            </div>
            <hr />
            <p
                dangerouslySetInnerHTML={{
                    __html: isOutputLoading ? "Loading output..." : output ?? 'Click "Run Code" to see the output here',
                }}
                className="text-lg p-3 text-gray-200"
            />
        </div>
    );
}

export default OutputDisplay;