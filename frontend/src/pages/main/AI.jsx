import React, { useState } from 'react';
import { useAuth } from "../../context/AuthProvider";
import { Copy, Check, Terminal, Key, Info } from "lucide-react";

export default function AI() {
    const { mcpAPI } = useAuth();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (mcpAPI) {
            navigator.clipboard.writeText(mcpAPI);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const configSnippet = `{
  "mcpServers": {
    "xpense-track": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-remote",
        "https://your-deployed-mcp-server.com/sse"
      ],
      "env": {
        "MCP_API_KEY": "${mcpAPI || 'YOUR_API_KEY'}"
      }
    }
  }
}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        AI Integration
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Connect your expense data with Claude AI using our bridged MCP server.
                    </p>
                </div>

                {/* API Key Section */}
                <div className="backdrop-blur-xl bg-slate-800/60 rounded-3xl p-8 shadow-2xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                            <Key className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Your MCP API Key</h2>
                    </div>

                    <p className="text-slate-300 mb-4">
                        This key authenticates your MCP client with your personal expense data. Keep it secret!
                    </p>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={mcpAPI || "Loading..."}
                            className="w-full h-14 pl-12 pr-14 bg-slate-900/80 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                        />
                        <button
                            onClick={handleCopy}
                            className="absolute right-2 top-2 p-2 hover:bg-slate-700 rounded-lg transition-colors group/btn"
                            title="Copy to clipboard"
                        >
                            {copied ? (
                                <Check className="w-5 h-5 text-green-400" />
                            ) : (
                                <Copy className="w-5 h-5 text-slate-400 group-hover/btn:text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Configuration Guide */}
                <div className="backdrop-blur-xl bg-slate-800/60 rounded-3xl p-8 shadow-2xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <Terminal className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Claude Desktop Configuration</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4 items-start p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl">
                            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                            <div className="text-slate-300 text-sm">
                                <p className="font-semibold text-blue-300 mb-1">How to Setup</p>
                                <p>
                                    Open your Claude Desktop config file (usually at
                                    <code className="bg-slate-900 px-1.5 py-0.5 rounded mx-1 text-slate-200">%APPDATA%/Claude/claude_desktop_config.json</code>
                                    on Windows) and add the following server configuration:
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(configSnippet);
                                        // Optional: toast or visual feedback
                                    }}
                                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                                    title="Copy config"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                            <pre className="bg-slate-950 rounded-xl p-6 overflow-x-auto border border-slate-800">
                                <code className="text-sm font-mono text-purple-300">
                                    {configSnippet}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}