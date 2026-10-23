export interface MarkovModule {
    transitionMatrix(prices: number[]): number[][];
    forecast(matrix: number[][], start: number, steps: number): number[][];
}

export default function createMarkov(): Promise<MarkovModule>;
