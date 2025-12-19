# XpenseTrack 2.0 💸

**XpenseTrack** is a state-of-the-art full-stack expense management application integrated with a **Bridged Model Context Protocol (MCP)** server. It allows users to manage their finances while enabling AI agents (like Claude) to securely analyze their spending habits through a remote tool interface.

---

## 🚀 Key Features

-   **Full-Stack Management**: Add, track, and categorize expenses with a sleek, responsive UI.
-   **AI Integration**: A dedicated AI page provides configuration and credentials for connecting Claude AI to your data.
-   **Bridged MCP Server**: A secure Python-based bridge that exposes database tools (reports, categorizations) to LLMs via SSE.
-   **Secure Authentication**: Multi-layered auth using JWT for the web app and custom API key verification for remote MCP tool execution.
-   **Modern UI**: Glassmorphism design with dark mode support and interactive micro-animations.

---

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React.js
-   **Styling**: Vanilla CSS / Tailwind (Refined Aesthetics)
-   **Icons**: Lucide React
-   **State Management**: React Context API

### Backend (API)
-   **Runtime**: Node.js & Express
-   **Database**: MongoDB (Mongoose ODM)
-   **Security**: JWT, Bcrypt, Nanoid

### AI Bridge (MCP)
-   **Language**: Python
-   **Framework**: FastMCP (Python MCP SDK)
-   **Transport**: Streamable HTTP (SSE)
-   **Security**: Custom `@require_auth` decorator system

---

## 📂 Project Structure

-   `/frontend`: React application for the user interface.
-   `/backend`: Node.js/Express server handling core business logic and DB.
-   `/mcp-server`: Python server that creates the AI tool bridge.

## ⚙️ Configuration

1.  **Backend**: Set up `.env` with `MONGO_URI` and `JWT_SECRET`.
2.  **MCP Server**: Run `uv run server.py` and ensure the internal `verifyMCPAPI` endpoint is reachable.
3.  **Claude Desktop**: Add the snippet from the web app's AI page to your `claude_desktop_config.json`.

---
*Created with ❤️ by Abhi*