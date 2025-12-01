const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D1117] text-[#F0F6FC] font-[Poppins]">
      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#30363D_1px,transparent_1px),linear-gradient(to_bottom,#30363D_1px,transparent_1px)] bg-[length:40px_40px] opacity-10"></div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] -translate-x-1/2 -translate-y-1/2 -skew-y-[15deg] bg-[linear-gradient(45deg,rgba(0,119,255,0.2),rgba(0,245,212,0.1)_50%,rgba(0,119,255,0.05))] blur-[100px] z-0"></div>

      {/* Bars Animation */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 flex justify-evenly items-end pointer-events-none z-10 [mask-image:linear-gradient(to_top,rgba(0,0,0,1),transparent)]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-[5vw] bg-gradient-to-t from-[#0077FF] to-[#00F5D4] opacity-10 shadow-[0_0_15px_rgba(0,245,212,0.3)] animate-[rise_10s_infinite_ease-in-out_alternate]"
            style={{
              animationDelay: `${i}s`,
              animationDuration: `${7 + (i % 6)}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Card */}
      <div className="relative z-20 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <a className="inline-flex items-center justify-center gap-2" href="http://localhost:5173/">
            <svg
              className="h-10 w-10 text-[#00F5D4]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.29,6.71l-4.58-4.58A2,2,0,0,0,15.29,2H8.71a2,2,0,0,0-1.42.59L2.71,6.71A2,2,0,0,0,2,8.12V15.88a2,2,0,0,0,.59,1.42l4.58,4.58A2,2,0,0,0,8.71,22h6.58a2,2,0,0,0,1.42-.59l4.58-4.58A2,2,0,0,0,22,15.88V8.12A2,2,0,0,0,21.29,6.71ZM12,18a6,6,0,1,1,6-6A6,6,0,0,1,12,18Zm-1.5-8.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z"></path>
            </svg>
            <span className="text-3xl font-bold text-white tracking-wider">
              XpenseTrack
            </span>
          </a>
        </div>

        <div className="bg-[#161B22]/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3),0_0_20px_rgba(0,245,212,0.1)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm text-[#8B949E]">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>
        </div>

        {footer && <div className="mt-8 text-center text-sm text-[#8B949E]">{footer}</div>}
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes rise {
            0% { height: 5%; }
            100% { height: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default AuthLayout;
