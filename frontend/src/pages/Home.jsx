import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ArrowRight, PieChart, ShieldCheck, Wallet } from "lucide-react";

const Home = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Redirect logged-in users to dashboard
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);

    if (isLoggedIn) return null; // Avoid flicker

    return (
        <div className="min-h-screen bg-[#111827] text-white font-sans">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8 fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        v2.0 is now live
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Master Your Finances <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            Build Your Future
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        XpenseTrack simplifies expense tracking and budgeting. Gain clear insights into your spending habits and take control of your financial freedom today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                        >
                            Get Started Free
                            <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl font-bold text-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
                        >
                            Log In
                        </Link>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-[#0f1523]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose XpenseTrack?</h2>
                        <p className="text-gray-400">Everything you need to manage your money effectively.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Wallet className="text-green-400" size={32} />}
                            title="Smart Budgeting"
                            description="Set monthly budgets for different categories and track your progress in real-time."
                        />
                        <FeatureCard
                            icon={<PieChart className="text-purple-400" size={32} />}
                            title="Visual Analytics"
                            description="Understand your spending patterns with interactive charts and detailed reports."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="text-blue-400" size={32} />}
                            title="Secure & Private"
                            description="Your financial data is encrypted and secure. We never share your information."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Ready to take control?</h2>
                    <p className="text-gray-400 mb-10 text-lg">Join thousands of users who are already managing their finances smarter with XPTrack.</p>
                    <Link
                        to="/signup"
                        className="inline-flex px-10 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
                    >
                        Create Your Free Account
                    </Link>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 rounded-2xl bg-[#1f2937]/50 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:bg-[#1f2937] hover:transform hover:-translate-y-1">
        <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
);

export default Home;