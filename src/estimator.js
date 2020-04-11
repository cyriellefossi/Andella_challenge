
 /* 
    format of input data
        // la fonction recois ca en parametre ces objetsS
    {
        region: {
            name: " Africa",
            avgAge: 19.7,
            avgDailyIncomeInUSD:5,
            avgDailyIncomePopulation: 0.71
        },
        periodType: "days",
        timeToElapse: 58,
        reportedCases: 674,
        totalHospitlBeds:1380614
    }
    output format:

        // ici c'est la reponse que retourne la fonction
    {
        data: {},
        impact:{},
        severeImpact: {}
    }
    {
        data: { what was inputed},
        impact:{
            currentlyInfected: 27470,
            infectionsByRequestedTime: 112517120,
            severeCasesByRequestedTime:16877568,
            hospitalBedsByRequestedTime: -16639962,
            casesForICUByRequestedTime: 5625856,
            casesForVentilatorsByRequestedTime: 2252342,
            dollarsInFlight: 12484899635.2
        },
        severeImpact: {
             currentlyInfected: 237350,
            infectionsByRequestedTime: 562585600,
            severeCasesByRequestedTime:84387840,
            hospitalBedsByRequestedTime: -84150234,
            casesForICUByRequestedTime: 28129280,
            casesForVentilatorsByRequestedTime: 11251712,
            dollarsInFlight: 62424498176
        }
    }
*/

const covid19ImpactEstimator = (data) =>{
    //data
    // computing the curently infected cases
    let impactCurentlyInfected =data.reportedCases * 10;
    // computing the severe impact curently infected
    let severeImpactCurrentlyInfected = data.reportedCases * 50;
    let impactCurentlyInfectedByRequestedTime = data.reportedCases * 10 * 1024;
    // computing the infected requested time in impact
    let servereCurentlyInfectedByRequestedTime = data.reportedCases * 50 * 1024;
    //computing the infected by requested time in serverImpact

    let monthlyServereCasesByRequestedTime = data.reportedCases * 10 * 1024 * 0.15;
    // 

    let totalHospitlBeds = ( 0.35 * data.totalHospitlBeds) - data.reportedCases * 10 * 1024 * 0.15 > 0 ? 
                Math.ceil ((0.35 * data.totalHospitlBeds) - data.reportedCases * 10 * 1024 * 0.15 ) // si le resulta est supperieur a zero alors la fonction math.ceil arrondi par ecces
                   : Math.floor ((0.35 * data.totalHospitlBeds) - data.reportedCases * 10 * 1024 * 0.15   );// et si le resultat est inferieur il arrondi par defaut

    let impactInfectionsByRequestedTime = Math.ceil( data.reportedCases * 10 * 1024 *0.05 );

    let severeInfectionsByRequestedTime = Math.ceil(data.reportedCases * 10 * 1024 * 0.05);

    let impactCasesForVentilatorsByRequestedTime = Math.ceil(data.reportedCases * 10 * 1024 * 0.02);
            // il determinera les 2% des infections au moment demande ceci dit il va recuperer les valeurs dans la variable des personne infectes situe un peu plus haut
    let servereCasesForVentilatorsByRequestedTime = Math.ceil (impactCurentlyInfectedByRequestedTime * 0.02);
         // il en fera pour autant dans l'objet severe
    //let impactDollarsInFlight = (impactCasesForVentilatorsByRequestedTime * 0.65)  *  data.region.avgDailyIncomepopulation * 30 ;
    let impactDollarsInFlight =  (data.reportedCases  * 10 * 1024 * 0.65) * data.region.avgDailyIncomePopulation * 30;

    let servereDollarsInFlight = (data.reportedCases  * 50 * 1024 * 0.65) * data.region.avgDailyIncomePopulation * 30;


    let response = {
        data: data,
        impact:{
            currentlyInfected:impactCurentlyInfected ,
            infectionsByRequestedTime: impactCurentlyInfectedByRequestedTime,
            severeCasesByRequestedTime:monthlyServereCasesByRequestedTime,
            hospitalBedsByRequestedTime: totalHospitlBeds,
            casesForICUByRequestedTime: impactInfectionsByRequestedTime,
            casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
            dollarsInFlight: impactDollarsInFlight
        },
        severeImpact: {
            currentlyInfected: severeImpactCurrentlyInfected,
            infectionsByRequestedTime: servereCurentlyInfectedByRequestedTime ,
            severeCasesByRequestedTime:monthlyServereCasesByRequestedTime,
            hospitalBedsByRequestedTime: totalHospitlBeds,
            casesForICUByRequestedTime: severeInfectionsByRequestedTime,
            casesForVentilatorsByRequestedTime: servereCasesForVentilatorsByRequestedTime,
            dollarsInFlight: servereDollarsInFlight
        }
    }
    return response;
} ;
// ceci c'est ce qu'on appel une fonction en fleche encore appele un arrow function

 /* console.log(covid19ImpactEstimator({
    region: {
        name: " Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD:5,
        avgDailyIncomePopulation: 0.75
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    totalHospitlBeds:1380614
})) */
export default covid19ImpactEstimator;

