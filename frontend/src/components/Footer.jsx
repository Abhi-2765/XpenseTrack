import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const FooterLink = ({ to, label }) => (
    <li>
        <Link
            to={to}
            className="hover:text-green-400 hover:translate-x-1 transition-all duration-300 inline-block"
        >
            {label}
        </Link>
    </li>
);

const SocialIcon = ({ icon, href }) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
    >
        {icon}
    </a>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#111827] border-t border-gray-700 pt-16 pb-8 text-gray-400 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src="src/assets/logo.png" alt="XPTrack Logo" className="w-40 h-auto" />
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Take control of your finances with XPTrack. Smart budgeting, detailed analytics, and seamless expense tracking all in one place.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon icon={<Twitter size={20} />} href="#" />
                            <SocialIcon icon={<Facebook size={20} />} href="#" />
                            <SocialIcon icon={<Instagram size={20} />} href="#" />
                            <SocialIcon icon={<Linkedin size={20} />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/dashboard" label="Dashboard" />
                            <FooterLink to="/transaction" label="Transactions" />
                            <FooterLink to="/budget" label="Budgets" />
                            <FooterLink to="/groups" label="Groups" />
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/about" label="About Us" />
                            <FooterLink to="/privacy" label="Privacy Policy" />
                            <FooterLink to="/terms" label="Terms of Service" />
                            <FooterLink to="/cookies" label="Report a Bug" />
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>© {currentYear} XPTrack. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


export default Footer;