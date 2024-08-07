// variables of time related words
const singleDigit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
const doubleDigit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const belowHundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty',]
/**function timeWord(time = "00-24:00-60")
 * 
 * timeWord() takes an argument of time, which is a string of 24hr time
 * e.g. 23:23 is eleven twenty three PM
 */
function timeWord(time) {
    let word
    if (time == "00:00") {
        console.log('midnight')
        word = 'midnight'
        return word
    } else if (time == "12:00") {
        console.log('noon')
        word = 'noon'
        return word
    }
    const [hours, minutes] = time.split(':');
    //minutes
    if (minutes == "00") {
        word = "o'clock"
    } else {
        const [tens, singles] = minutes.split("")

        if (tens == "0") {
            word = "oh" + " " + singleDigit[singles]
        } else if (tens == "1") {
            word = doubleDigit[Number(tens) + Number(singles) - 1]
        } else if (tens >= "2" && tens <= "6") {
            word = belowHundred[tens - 2]
            if (singles != "0") {
                word = word + " " + singleDigit[singles]
            }
        }

    }


    if (hours == "00") {
        word = "Twelve" + " " + word + " " + "AM"
        return word
    }
    // AM hours
    if (hours >= 0 && hours <= 9) {
        word = singleDigit[hours.replace(/^0+/, "")] + " " + word + " " + "AM"
    } else if (hours == "10" || hours == "11") {
        word = doubleDigit[hours - 10] + " " + word + " " + "AM"
    }
    // PM hours
    if (hours == "12") {
        word = doubleDigit[hours - 10] + " " + word + " " + "PM"
    } else if (hours >= 13 && hours <= 21) {
        word = singleDigit[hours - 12] + " " + word + " " + "PM"
    } else if (hours == "22" || hours == "23") {
        word = doubleDigit[hours - 22] + " " + word + " " + "PM"
    }

    return word
}

module.exports = timeWord;