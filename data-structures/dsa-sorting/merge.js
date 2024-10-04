function merge(arr1, arr2) {
    const sorted = []
    let idxA = 0
    let idxB = 0
    while (idxA < arr1.length && idxB < arr2.length) {

        if (arr1[idxA] < arr2[idxB]) {
            sorted.push(arr1[idxA])
            idxA++
        } else {
            sorted.push(arr2[idxB])
            idxB++
        }
    }

    while (idxA < arr1.length) {
        sorted.push(arr1[idxA])
        idxA++
    }
    while (idxB < arr2.length) {
        sorted.push(arr2[idxB])
        idxB++
    }
    return sorted
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))

    return merge(left, right)
}

module.exports = { merge, mergeSort };