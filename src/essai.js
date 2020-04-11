let date = {
        data: data,
        impact:{
            currentlyInfected: data.reportedCases  * 10,
            infectionsByRequestedTime: data.reportedCases  * 10 * 1024 ,
            severeCasesByRequestedTime:Math.ceil(data.reportedCases  * 10 * 1024 * 0.15),
            hospitalBedsByRequestedTime:(data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15>0? Math.ceil((data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15) : Math.floor((data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15) ,
            casesForICUByRequestedTime:Math.ceil( data.reportedCases  * 10 * 1024 *0.05) ,
            casesForVentilatorsByRequestedTime: Math.ceil(data.reportedCases  * 10 * 1024 * 0.02) ,
            dollarsInFlight: (data.reportedCases  * 10 * 1024 * 0.65) * data.region.avgDailyIncomePopulation * 30
        },
        severeImpact: {
            currentlyInfected: data.reportedCases *50 ,
           infectionsByRequestedTime: data.reportedCases  * 50 * 1024,
           severeCasesByRequestedTime:Math.ceil( data.reportedCases  * 50 * 1024 * 0.15),
           hospitalBedsByRequestedTime:(data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15>0? Math.ceil((data.totalHospitlBeds * 0.35) - data.reportedCases  * 50 * 1024 * 0.15) : Math.floor((data.totalHospitlBeds * 0.35) - data.reportedCases  * 50 * 1024 * 0.15) ,
           casesForICUByRequestedTime: Math.ceil(data.reportedCases  * 50 * 1024 * 0.05),
           casesForVentilatorsByRequestedTime: Math.ceil(data.reportedCases  * 50 * 1024 * 0.02),
           dollarsInFlight: (data.reportedCases  * 50 * 1024 * 0.65) * data.region.avgDailyIncomePopulation * 30
       }
    }