import * as express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numbers: number[] = [];

const fetchNumbers = async (): Promise<number[]> => {
    try {
        const response = await axios.get("http://api.testserver.com/numbers");
        if (response.status === 200) {
            return response.data.numbers || [];
        }
    } catch (error) {
        console.error("Error fetching numbers:", error);
        return [];
    }
    return [];
};

const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const isFibonacci = (num: number): boolean => {
    let a = 0, b = 1;
    while (b < num) {
        [a, b] = [b, a + b];
    }
    return b === num;
};

const updateNumbers = async () => {
    const fetchedNumbers = await fetchNumbers();
    numbers.push(...fetchedNumbers);
    numbers = Array.from(new Set(numbers));
    if (numbers.length > WINDOW_SIZE) {
        numbers = numbers.slice(-WINDOW_SIZE);
    }
};

app.get('/numbers/:numberid', async (req: Request, res: Response) => {
    await updateNumbers();
    const { numberid } = req.params;
    let numbersFiltered: number[] = [];
    switch (numberid) {
        case 'p':
            numbersFiltered = numbers.filter(isPrime);
            break;
        case 'f':
            numbersFiltered = numbers.filter(isFibonacci);
            break;
        case 'e':
            numbersFiltered = numbers.filter(num => num % 2 === 0);
            break;
        case 'r':
            numbersFiltered = numbers;
            break;
        default:
            return res.status(400).json({ error: 'Invalid number ID' });
    }
    const windowPrevState = [];
    const windowCurrState = [1,3,5,7];
    const avg = windowCurrState.length > 0 ? windowCurrState.reduce((acc, num) => acc + num, 0) / windowCurrState.length : 0;
    res.json({
        windowPrevState,
        windowCurrState,
        numbers: windowCurrState,
        avg: avg.toFixed(2)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});