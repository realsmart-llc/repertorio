// var data = pointData = {
// 	"race": {
// 		"White": 54.53932011681568,
// 		"Black or African American": 3.228067123225154,
// 		"Asian": 1.238676919377094
// 	},
// 	"latino": {
// 		"Latino": 2.3272111818599948,
// 		"Non-Latino": 58.06767255382922
// 	},
// 	"homes": {
// 		"Owner Occupied": 59.41895646587696,
// 		"Renter Occupied": 0.7507132844709661
// 	},
// 	"education": {
// 		"Did Not Finish High School": 1.2369195166138833,
// 		"High School or GED": 19.26595853150109,
// 		"Bachelor's degree": 11.61954697425163,
// 		"Master's or Professional": 7.3465522804945795,
// 		"Doctorate degree": 3.5608289114642093
// 	},
// 	"population": {
// 		"0To25": 17.279390823000007,
// 		"25To65": 38.456952243813454,
// 		"65Plus": 4.5728539705119315,
// 		"total": 60.3091970373254
// 	},
// 	"median_income": 112500,
// 	"housing": {
// 		"numberOfHouseholds": 20.71968665139866,
// 		"median": 225000
// 	},
// 	"reportSpecification" : {
// 		reportName: "general_demographic_report",
// 		geoJSON: {
// 			type: "Feature",
// 			geometry: {
// 				coordinates: [-79.523149,36.095723],
// 				radius: 160,
// 				type: "Point"
// 			},
// 			properties: {
// 	      "address" : "204 Windrift Drive, Gibsonville, NC"
// 	     }
// 		}
// 	}
// }

var data= polygonData = {
	"race": {
		"White": 54.53932011681568,
		"Black or African American": 3.228067123225154,
		"Asian": 1.238676919377094
	},
	"latino": {
		"Latino": 2.3272111818599948,
		"Non-Latino": 58.06767255382922
	},
	"homes": {
		"Owner Occupied": 59.41895646587696,
		"Renter Occupied": 0.7507132844709661
	},
	"education": {
		"Did Not Finish High School": 1.2369195166138833,
		"High School or GED": 19.26595853150109,
		"Bachelor's degree": 11.61954697425163,
		"Master's or Professional": 7.3465522804945795,
		"Doctorate degree": 3.5608289114642093
	},
	"population": {
		"0To25": 17.279390823000007,
		"25To65": 38.456952243813454,
		"65Plus": 4.5728539705119315,
		"total": 60.3091970373254
	},
	"median_income": 112500,
	"housing": {
		"numberOfHouseholds": 20.71968665139866,
		"median": 225000
	},
	"reportSpecification" : {
		reportName: "general_demographic_report",
        geoJSON:     {
            "type": "Feature",
            "properties" : {
                "address" : "205 Windrift Drive, Gibsonville, NC"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                [
                    [
                    -78.67704391479492,
                    35.74261114799056
                    ],
                    [
                    -78.61438751220702,
                    35.74261114799056
                    ],
                    [
                    -78.61438751220702,
                    35.79261448502952
                    ],
                    [
                    -78.67704391479492,
                    35.79261448502952
                    ],
                    [
                    -78.67704391479492,
                    35.74261114799056
                    ]
                ]
              ]
            }
        }
	}
}
