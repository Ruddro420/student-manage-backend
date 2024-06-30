const number = {
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    "0": "১০"
}

const e2b_number = (enNumber) => {
    enNumber = enNumber.toString();
    let bnNumber = '';
    for (let char of enNumber) {
        if (number[char] !== undefined) {
            bnNumber += number[char];
        } else {
            bnNumber += char; // if character is not a digit, keep it unchanged
        }
    }
    return bnNumber;
}

const status= {
    "ongoing": "অনগোয়িং",
    "finished": "ফিনিশড"
}

export {
    e2b_number,
    status
}