import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const PageNotFound = () => {
    return (
        <>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

                {/* Glowing background ring */}
                <div className="absolute w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse-slow"></div>

                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-12 text-center space-y-10 max-w-xl w-full fade-up relative">

                    {/* 3D Floating 404 */}
                    <div className="relative flex justify-center">
                        <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-slate-300/20 tracking-widest select-none animate-pulse-slow drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                            404
                        </h1>
                    </div>

                    {/* Heading */}
                    <div className="space-y-4 fade-up">
                        <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
                            Lost in Space
                        </h2>

                        <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
                            The page you're searching for drifted far across the universe.
                            Let’s get you back on track.
                        </p>
                    </div>

                    {/* Animated Button */}
                    <div className="pt-2 fade-up">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-3 px-7 py-3.5 
                                       bg-blue-600/90 hover:bg-blue-700 text-white 
                                       rounded-xl font-semibold transition-all 
                                       duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] 
                                       active:scale-95"
                        >
                            <Home className="w-5 h-5" />
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;
