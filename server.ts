import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

interface CityWeather {
    today: number;
    forecast: {
        dayOne: number;
        dayTwo: number;
        dayThree: number;
    };
}

const weatherData: Record<string, CityWeather> = {
    london: {
        today: 14,
        forecast: {
            dayOne: 14,
            dayTwo: 23,
            dayThree: 17
        }
    },
    newyork: {
        today: 18,
        forecast: {
            dayOne: 16,
            dayTwo: 21,
            dayThree: 19
        }
    }
};

app.get('/api/weather/:city/forecast', (req: Request, res: Response) => {
    const city = req.params.city.toLowerCase();
    if (weatherData[city]) {
        res.json(weatherData[city].forecast);  // ✅ Return forecast directly
    } else {
        res.status(404).json({ error: 'City not found' });
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to the Weather API! Use /api/weather/{city} to get weather data.");
});


app.listen(port, () => {
    console.log(`Weather API running at http://localhost:${port}`);
});
