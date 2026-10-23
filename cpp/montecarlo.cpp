#include <emscripten/bind.h>
#include <random>
#include <vector>
#include <cmath>

std::random_device rd;                                  // gives a random seed
std::mt19937 gen(rd());                                 // the random number engine, seeded
std::uniform_real_distribution<double> dist(0.0, 1.0);  // "uniform numbers between 0 and 1"

double estimatePi(int n) {
    int inside = 0;
    for (int i = 0; i < n; i++) {
        double x = dist(gen);
        double y = dist(gen);
        if (x*x + y*y <= 1.0) {inside++;}
    }
    double pi = (4.0 * inside) / n;
    return pi;
}

emscripten::val estimatePath(int n, int points) {
    if (points < 1) {points = 1;}
    if (points > n) {points = n;}
    int step = n / points;
    int inside = 0;
    std::vector<double> estimates;
    for (int i = 0; i < n; i++) {
        double x = dist(gen);
        double y = dist(gen);
        if (x*x + y*y <= 1.0) {inside++;}
        if ((i + 1) %step == 0) {
            double pi = (4.0 * inside) / (i + 1);
            estimates.push_back(pi);
        }
    }
    return emscripten::val::array(estimates);
}

emscripten::val estimatePathLog(int n, int points) {
    if (points < 1) {points = 1;}
    if (n < 100) {n = 100;}
    double factor = std::pow(n / 100.0, 1.0 / points);
    int inside = 0;
    double next = 100.0;
    std::vector<double> estimates;
    std::vector<double> ns;
    for (int i = 0; i < n; i++) {
        double x = dist(gen);
        double y = dist(gen);
        if (x*x + y*y <= 1.0) {inside++;}
        if (i + 1 >= next) {
            next = next * factor;
            double pi = (4.0 * inside) / (i + 1);
            estimates.push_back(pi);
            ns.push_back(i + 1);
        }
    }
    emscripten::val result = emscripten::val::object();
    result.set("n", emscripten::val::array(ns));
    result.set("pi", emscripten::val::array(estimates));
    return result;
}

EMSCRIPTEN_BINDINGS(montecarlo) {
    emscripten::function("estimatePi", &estimatePi);
    emscripten::function("estimatePath", &estimatePath);
    emscripten::function("estimatePathLog", &estimatePathLog);
}