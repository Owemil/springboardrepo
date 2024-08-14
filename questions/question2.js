function numsBetween(min = 1, max = 20) {

    if (Math.sign(min) != 1 || Math.sign(max) != 1) throw new Error("min and max must be positive integers")
    let count = 0
    for (let n = min; n <= max; n++) {

        if (n < 10) count++

        if (n >= 10 && n < 100) {

            const [num1, num2] = String(n).split("")

            if (num1 != num2) count++
        }
        if (n >= 100) {

            const [num1, num2, num3] = String(n).split("")

            if (num1 != num2 && num1 != num3 && num2 != num3) count++

        }
    }
    return count
}