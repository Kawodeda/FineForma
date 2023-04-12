export function nearlyEquals(a: number, b: number, epsilon: number = 0.000001) {
    const difference = Math.abs(a - b);

    return difference < epsilon;
}