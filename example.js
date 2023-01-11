function cekBilangan(value) {
    if(value % 2 == 0){
        return `${value} adalah genap`
    } else{
        return `${value} adalah ganjil`
    }
}

const des = "Shibuya"

module.exports = {des, cekBilangan}