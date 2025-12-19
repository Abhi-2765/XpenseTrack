from mcp.server.fastmcp import FastMCP, Context
from bridge.backend import expense_report, categorized_expense_report
from middleware import require_auth
from typing import Any
from dotenv import load_dotenv
import os
import re
import logging

load_dotenv()

PORT = int(os.getenv("PORT"))

app = FastMCP("xpensetrack", host="0.0.0.0", port=PORT)

main_url = os.getenv("BACKEND_URL")
DATE_REGEX = r"^\d{4}-\d{2}-\d{2}$"

# Tool for expense report
@app.tool()
@require_auth
async def get_expense_report(
    start_date: str,
    end_date: str,
    ctx: Context = None,
    user_id: str | None = None
) -> dict | None:
    """
        Fetches a user's expense report grouped by date and category.

        AUTHENTICATION
        --------------
        - Caller MUST NOT provide `user_id` manually

        PARAMETERS
        ----------
        start_date : str
            Start date in YYYY-MM-DD format (inclusive)

        end_date : str
            End date in YYYY-MM-DD format (inclusive)

        ctx : Context, optional
            MCP request context (used internally for authentication)

        user_id : str, optional
            Automatically injected by authentication middleware

        RETURNS
        -------
        dict | None
            On success:
            {
                "date_1": {
                    "category_1": amount,
                    "category_2": amount,
                    ...
                },
                "date_2": {
                    "category_1": amount,
                    "category_2": amount,
                    ...
                }
            }

            On failure:
            None
    """


    route = "mcp/getExpenseReport"

    try:
        if not re.match(DATE_REGEX, start_date) or not re.match(DATE_REGEX, end_date):
            raise ValueError("Dates must be YYYY-MM-DD")

        return await expense_report(
            f"{main_url}{route}",
            start_date,
            end_date,
            userId=user_id
        )

    except Exception as e:
        logging.error(f"[MCP] Expense report error: {e}")
        return None

# Tool for categorized expense report
@app.tool()
@require_auth
async def get_categorized_expense_report(
    category: str,
    start_date: str,
    end_date: str,
    ctx: Context = None,
    user_id: str | None = None
) -> dict | None:
    """
    Fetches expense data for a specific category within a date range.

    AUTHENTICATION
    --------------
    - Requires MCP API key
    - `user_id` is injected by middleware
    - Caller should never pass `user_id`

    PARAMETERS
    ----------
    category : str
        Expense category.
        Allowed values:
        food, housing, transport, shopping,
        utilities, healthcare, entertainment, other

    start_date : str
        Start date in YYYY-MM-DD format

    end_date : str
        End date in YYYY-MM-DD format

    ctx : Context, optional
        MCP request context (used for auth)

    user_id : str, optional
        Injected authenticated user ID

    RETURNS
    -------
    dict | None
        On success:
        {
            "category": {
                "date_1": amount,
                "date_2": amount,
                ...
            }
        }

        On failure:
        None
    """


    route = "mcp/getCategorizedExpenseReport"
    allowed = {
        "food", "housing", "transport", "shopping",
        "utilities", "healthcare", "entertainment", "other"
    }

    try:
        if category not in allowed:
            raise ValueError("Invalid category")

        if not re.match(DATE_REGEX, start_date) or not re.match(DATE_REGEX, end_date):
            raise ValueError("Dates must be YYYY-MM-DD")

        return await categorized_expense_report(
            f"{main_url}{route}",
            category,
            start_date,
            end_date,
            userId=user_id   
        )

    except Exception as e:
        logging.error(f"[MCP] Categorized expense error: {e}")
        return None


def main():
    app.run(transport="streamable-http")


if __name__ == "__main__":
    main()
