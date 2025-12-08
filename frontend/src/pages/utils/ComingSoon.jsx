import { Hammer } from "lucide-react";

const ComingSoon = ({ pageName }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center fade-up">

                <Hammer className="w-16 h-16 text-blue-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                <h1 className="text-4xl font-bold text-white tracking-wide mb-3">
                    Coming Soon
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed">
                    We're working on something awesome for {pageName}.
                    Stay tuned — it's on the way! 🚀
                </p>
            </div>

        </div>
    );
}

export default ComingSoon;