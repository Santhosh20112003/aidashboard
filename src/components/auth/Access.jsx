import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import toast, { Toaster } from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

function Login() {
    const [loading, setloading] = useState(false);
    const { googleSignIn, GithubSignIn, FacebookSignIn } = useUserAuth();
    const navigate = useNavigate();

    const GoogleAuth = async () => {
        setloading(true);
        try {
            await googleSignIn();
            // toast.success("Authentication Success", { position: "top-right" });
            navigate("/dashboard");
        } catch (err) {
            toast.error(
                err.message
                    .replace("Firebase:", "")
                    .replace(".", "")
                    .replace("Error (", "")
                    .replace(")", "")
                    .replace("auth/", "")
                    .replaceAll("-", " "),
                { position: "top-right" }
            );
        } finally {
            setloading(false);
        }
    };

    const GitHubAuth = async () => {
        setloading(true);

        try {
            await GithubSignIn();
            navigate("/dashboard");
        } catch (err) {
            toast.error(
                err.message
                    .replace("Firebase:", "")
                    .replace(".", "")
                    .replace("Error (", "")
                    .replace(")", "")
                    .replace("auth/", "")
                    .replaceAll("-", " "),
                { position: "top-right" }
            );
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="flex h-[100vh] w-full">
            <Link
                to="/home"
                className="fixed active:scale-105 transition-transform  flex items-center justify-center p-2 top-5 left-5 rounded-lg shadow-lg bg-black w-fit h-fit"
            >
                <IoMdArrowRoundBack className="text-xl text-white fas fa-arrow-left font-bold" />
            </Link>
            <div className="flex min-h-[100vh] w-full lg:w-1/2 items-center flex-col justify-center px-6 py-12 lg:px-8 ">
                <span className="rounded-xl lg:border-slate-400 bg-black lg:shadow-none shadow-lg lg:border lg:w-[400px] p-5">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto size-24"
                            src={"https://ik.imagekit.io/vituepzjm/codesparklight.png?updatedAt=1732083467086"}
                            alt="Your Company"
                        />

                        <h2 className="text-white mt-2 text-center text-3xl font-extrabold">
                            Enter Your Space
                        </h2>

                        <h3 className="text-center mt-1 text-md text-slate-100 ">
                            Login and Start Using CodeSpark
                        </h3>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div class="mt-7 flex flex-col gap-3">
                            <button
                                disabled={loading}
                                onClick={GitHubAuth}
                                class="inline-flex h-12 select-none w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                                <img
                                    src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                                    class="h-[18px] w-[18px] " />
                                Continue with GitHub
                            </button>

                            <button
                                disabled={loading}
                                onClick={GoogleAuth}
                                class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                    class="h-[18px] w-[18px] " />Continue with
                                Google
                            </button>
                        </div>

                    </div>
                </span>
            </div>
            <div className="hidden bg-gradient-to-tr from-black via-black/80 to-black/70 overflow-hidden relative lg:block w-1/2 h-full">
                <span className="absolute left-5 top-[40vh] z-50">
                    <h1 className="font-bold w-[500px] text-white text-5xl">
                        Your Ultimate Cloud Storage Solution
                    </h1>
                    <h3 className="font-medium w-96 mt-4 text-slate-200 text-xl">
                        Simplify File Management and Secure Data Storage Jump to latest
                    </h3>
                </span>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
