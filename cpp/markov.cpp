#include <emscripten/bind.h>
#include <vector>

emscripten::val transitionMatrix(emscripten::val pricesJs) {
    std::vector<double> prices = emscripten::vecFromJSArray<double>(pricesJs);
    std::vector<int> states;
    for (int i = 1; i < (int)prices.size(); i++) {
        double r = (prices[i] - prices[i-1]) / prices[i-1];
        if (r < -0.01)      {states.push_back(0);}          //states
        else if (r > 0.01)  {states.push_back(2);}
        else                {states.push_back(1);}
    }
    std::vector<std::vector<double>> counts(3, std::vector<double>(3, 0.0));
    for (int i = 1; i < (int)states.size() ; i++) {
        counts[states[i-1]][states[i]] += 1;
    }
    for (int row = 0; row < 3; row++) {
        double total = counts[row][0] + counts[row][1] + counts[row][2];
        if (total > 0) {
            for (int col = 0; col < 3; col++) {counts[row][col] /= total; }
        }
    }
    emscripten::val result = emscripten::val::array();
    for (int row = 0; row < 3; row++) {
        result.set(row, emscripten::val::array(counts[row]));
    }
    return result;
}
emscripten::val forecast(emscripten::val matrixJs, int start, int steps) {
    std::vector<std::vector<double>> P;
    for (int i = 0; i < 3; i++) {
        P.push_back(emscripten::vecFromJSArray<double>(matrixJs[i]));
    }
    std::vector<double> v(3, 0.0);
    v[start] = 1.0;
    std::vector<std::vector<double>> path;
    path.push_back(v);
    for (int s = 0; s < steps; s++){
        std::vector<double> next(3, 0.0);
        for (int j = 0; j < 3; j++) {
            for (int i = 0; i < 3; i++) {
                next[j] += v[i] * P[i][j];
            }
        }
        path.push_back(next);
        v = next;
    }
    emscripten::val result = emscripten::val::array();
    for (int row = 0; row < (int)path.size(); row++) {
        result.set(row, emscripten::val::array(path[row]));
    }
    return result;
}

EMSCRIPTEN_BINDINGS(markov) {
    emscripten::function("transitionMatrix", &transitionMatrix);
    emscripten::function("forecast", &forecast);
}
