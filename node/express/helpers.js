function mean(nums) {
    let total = 0

    for (let i = 0; i <= nums.length - 1; i++) {
        total += nums[i]
    }

    return total / nums.length
}

function median(nums) {

    if (nums.length % 2 == 0) {

        return (nums[nums.length / 2] + nums[nums.length / 2 - 1]) / 2
    } else {
        return nums[Math.floor(nums.length / 2)]
    }
}

function mode(nums) {
    let obj = {}
    for (let i = 0; i < nums.length; i++) {
        if (!obj[nums[i]]) {
            obj[nums[i]] = 1
        } else {
            obj[nums[i]]++
        }
    }
    let biggestValue = -1
    let biggestValuesKey = -1


    Object.keys(obj).forEach(key => {
        let value = obj[key]
        if (value > biggestValue) {
            biggestValue = value
            biggestValuesKey = key
        }
    })
    return Number(biggestValuesKey)
}

class ExpressError extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack)
    }
}

module.exports =
{
    mean,
    median,
    mode,
    ExpressError
}
