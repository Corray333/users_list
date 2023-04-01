const phoneValidation = (phone) => {
    const reg = /(\+7-\(9)\d\d\)-\d\d\d-\d\d-\d\d/
    return reg.test(phone)
}

const passwordValidation = (pass) => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return reg.test(pass)
}

const emailValidation = (email) => {
    const reg = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/
    return reg.test(email)
}

const wordValidation=(word)=>{
    const reg =  /^[A-Za-zА-Яа-я]+$/
    return reg.test(word)
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {capitalizeFirstLetter, phoneValidation, passwordValidation, emailValidation, wordValidation}