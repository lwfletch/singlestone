exports.jsonvalidator = function(reqBody, res){
    if(reqBody.name.first == undefined) res.send('Please include first name')
    if(reqBody.name.last == undefined) res.send('Please include last name')
    if(reqBody.address.street == undefined) res.send('Please include street in address')
    if(reqBody.address.city == undefined) res.send('Please include city in address')
    if(reqBody.address.state == undefined) res.send('Please include state in address')
    if(reqBody.address.zip == undefined) res.send('Please include zip code in address')
    if(reqBody.phone.type == undefined) res.send('Please include type in phone number')
    if(reqBody.phone.number == undefined) res.send('Please include phone number')
    if(reqBody.email == undefined) res.send('Please include email')
}