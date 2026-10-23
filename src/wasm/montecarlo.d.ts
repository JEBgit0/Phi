export interface MonteCarloModule {
    estimatePi(n: number): number;
    estimatePath(n: number, points: number): number[];
    estimatePathLog(n: number, points: number): { n: number[]; pi: number[] };
}

export default function createMonteCarlo(): Promise<MonteCarloModule>;