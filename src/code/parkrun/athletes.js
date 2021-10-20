module.exports = {
    GetAthleteIds: getAthleteIds
}

function getAthleteIds(){
    let athleteIds = [
        4116819, // Tim Cane 
    ]

    if(process.env.ELEVENTY_ENV == "prod"){
        athleteIds.push(
            ...[
                4431015, // Thomas Cope
                2537134, // Rebecca Lennon
                4344228, // Howard Towner
                4404459, // Nicholas Lennon
                5341203, // Jamie Brookes
                5388106, // Stephen Lennon
                3383442, // Chris Bolus
                6222230, // Grant Butler
                6255352, // Amy Guess                    
                5930535, // Andrew Joynson
            ]
        )
    }

    return athleteIds;
}