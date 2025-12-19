import httpx
import logging
import os
from functools import wraps
from mcp.server.fastmcp import Context
from dotenv import load_dotenv

load_dotenv()

async def verify_token(mcp_api_key: str) -> str | None:
    """
    Verify MCP API key with backend and return associated userId
    """
    if not mcp_api_key:
        return None

    backend_url = os.getenv("BACKEND_URL")
    route = "mcp/verifyMCPAPI"
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                f"{backend_url}{route}",
                json={"mcpAPI": mcp_api_key}
            )

        response.raise_for_status()
        data = response.json()

        logging.info(f"[AUTH] MCP verification successful: {data.get('userId')}")
        return data.get("userId")

    except Exception as e:
        logging.error(f"[AUTH] MCP verification failed: {e}")
        return None

def require_auth(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        ctx = next((arg for arg in args if isinstance(arg, Context)), None)
        if not ctx:
            ctx = kwargs.get("ctx")

        if not ctx:
            raise PermissionError("Context missing")

        request = ctx.request_context.request
        headers = request.headers or {}

        mcp_api_key = (
            headers.get("authorization")
            or headers.get("Authorization")
            or headers.get("X-API-KEY")
        )

        if not mcp_api_key:
            raise PermissionError("Missing MCP API key")

        if mcp_api_key.startswith("Bearer "):
            mcp_api_key = mcp_api_key.split(" ", 1)[1]

        user_id = await verify_token(mcp_api_key)
        if not user_id:
            raise PermissionError("Invalid MCP API key")

        kwargs["user_id"] = user_id

        return await func(*args, **kwargs)

    return wrapper
