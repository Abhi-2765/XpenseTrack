import { Download, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleExport = () => {
        console.log("Exporting user data...");
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 flex items-center justify-center">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-2xl border border-white/20">

                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

                    <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl shadow-xl border border-white/20">
                            <User className="w-14 h-14" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-white">Abhiram Varma</h1>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-white/10 my-7"></div>

                <div className="space-y-3">
                    <h2 class="text-xl font-semibold text-white">Account Details</h2>

                    <div className="flex flex-col gap-4 text-slate-300">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-slate-400">Email</p>
                            <p className="font-medium">abhiram@example.com</p>
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-wide text-slate-400">Member Since</p>
                            <p className="font-medium">2024</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">

                    <button
                        onClick={handleExport}
                        className="flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold 
                                   flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] 
                                   shadow-lg shadow-blue-900/20"
                    >
                        <Download className="w-5 h-5" />
                        Export Data
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold 
                                   flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] 
                                   shadow-lg shadow-red-900/20"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
