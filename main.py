from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
import httpx
import json

app = FastAPI()

# Load Indian location data
with open("C:/Users/Lenovo/Desktop/weather/data/india_data.json", "r") as f:
    india_data = json.load(f)

# Initialize template
#s and static files for the HTML frontend
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# OpenWeatherMap API key (replace with your actual API key)
API_KEY = "c958aa3df8a56aca485867d72fcae98f"

# Root endpoint to serve the HTML page
@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Endpoint to get states
@app.get("/states")
async def get_states():
    """Return list of states in India."""
    return [state["name"] for state in india_data["states"]]

# Endpoint to get districts of a specific state
@app.get("/states/{state_name}/districts")
async def get_districts(state_name: str):
    """Return list of districts in a state."""
    state = next((state for state in india_data["states"] if state["name"].lower() == state_name.lower()), None)
    if not state:
        raise HTTPException(status_code=404, detail="State not found")
    return [district["name"] for district in state["districts"]]

# Endpoint to get cities in a district of a specific state
@app.get("/states/{state_name}/districts/{district_name}/cities")
async def get_cities(state_name: str, district_name: str):
    """Return list of cities in a district."""
    state = next((state for state in india_data["states"] if state["name"].lower() == state_name.lower()), None)
    if not state:
        raise HTTPException(status_code=404, detail="State not found")

    district = next((district for district in state["districts"] if district["name"].lower() == district_name.lower()), None)
    if not district:
        raise HTTPException(status_code=404, detail="District not found")
    
    return district["cities"]

# Endpoint to get weather for a city
@app.get("/weather/{city_name}")
async def get_weather(city_name: str):
    """Return current weather information for a city."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}&units=metric"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            data = response.json()
            return {
                "city": data["name"],
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "icon": data["weather"][0]["icon"]
            }
        else:
            raise HTTPException(status_code=response.status_code, detail="Weather data not found")
