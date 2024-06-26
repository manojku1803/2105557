"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var axios_1 = require("axios");
var app = express();
var PORT = 9876;
var WINDOW_SIZE = 10;
var numbers = [];
// Fetch numbers from the test server
var fetchNumbers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("http://api.testserver.com/numbers")];
            case 1:
                response = _a.sent();
                if (response.status === 200) {
                    return [2 /*return*/, response.data.numbers || []];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching numbers:", error_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/, []];
        }
    });
}); };
// Check if a number is prime
var isPrime = function (num) {
    if (num < 2)
        return false;
    for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0)
            return false;
    }
    return true;
};
// Check if a number is Fibonacci
var isFibonacci = function (num) {
    var _a;
    var a = 0, b = 1;
    while (b < num) {
        _a = [b, a + b], a = _a[0], b = _a[1];
    }
    return b === num;
};
// Update numbers array
var updateNumbers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fetchedNumbers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchNumbers()];
            case 1:
                fetchedNumbers = _a.sent();
                numbers.push.apply(numbers, fetchedNumbers);
                numbers = Array.from(new Set(numbers));
                if (numbers.length > WINDOW_SIZE) {
                    numbers = numbers.slice(-WINDOW_SIZE);
                }
                return [2 /*return*/];
        }
    });
}); };
// Endpoint to get filtered numbers and calculate average
app.get('/numbers/:numberid', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var numberid, numbersFiltered, windowPrevState, windowCurrState, avg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updateNumbers()];
            case 1:
                _a.sent();
                numberid = req.params.numberid;
                numbersFiltered = [];
                switch (numberid) {
                    case 'p':
                        numbersFiltered = numbers.filter(isPrime);
                        break;
                    case 'f':
                        numbersFiltered = numbers.filter(isFibonacci);
                        break;
                    case 'e':
                        numbersFiltered = numbers.filter(function (num) { return num % 2 === 0; });
                        break;
                    case 'r':
                        numbersFiltered = numbers;
                        break;
                    default:
                        return [2 /*return*/, res.status(400).json({ error: 'Invalid number ID' })];
                }
                windowPrevState = __spreadArray([], numbers, true);
                windowCurrState = __spreadArray([], numbersFiltered, true);
                avg = windowCurrState.length > 0 ? windowCurrState.reduce(function (acc, num) { return acc + num; }, 0) / windowCurrState.length : 0;
                res.json({
                    windowPrevState: windowPrevState,
                    windowCurrState: windowCurrState,
                    numbers: windowCurrState,
                    avg: avg.toFixed(2)
                });
                return [2 /*return*/];
        }
    });
}); });
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
