import httpx
import logging


async def expense_report(
    url: str,
    start_date: str,
    end_date: str,
    userId: str
) -> dict | None:

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
            url,
            json={
                "start_date": start_date,
                "end_date": end_date
            },
            headers={
                "userid": userId
            }
        )


        response.raise_for_status()
        logging.info(response)
        return response.json()

    except Exception as e:
        logging.error(f"[HTTP] Expense report error: {e}")
        return None



async def categorized_expense_report(
    url: str,
    category: str,
    start_date: str,
    end_date: str,
    userId: str
) -> dict | None:

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                url,
                json={
                    "category": category,
                    "start_date": start_date,
                    "end_date": end_date
                },
                headers={"userId": userId}
            )

        response.raise_for_status()
        return response.json()

    except Exception as e:
        logging.error(f"[HTTP] Categorized expense error: {e}")
        return None
