var data = pointData = {
	"poverty": {
		"Total Families": 1127,
		"Total Families Below Poverty Line": 14,
		"Married Family with Children 5-17": 0,
		"Single Dad with Children 5-17": 0,
		"Single Mom with Children 5-17": 7,
		"Families Below Poverty Line Without Children 5-17": 7,
		"Families Below Poverty Line With Children 5-17": 7
	},
    "reportSpecification" : {
        reportName: "grid_poverty",
        geoJSON: {
            type: "Feature",
            geometry: {
                coordinates: [-79.523149,36.095723],
                radius: 1600,
                type: "Point"
            },
						properties: {
				      "address" : "204 Windrift Drive, Gibsonville, NC"
				     }
        }
    }
}

var xdata = polygonData = {
	"poverty": {
		"Total Families": 1127,
		"Total Families Below Poverty Line": 14,
		"Married Family with Children 5-17": 0,
		"Single Dad with Children 5-17": 0,
		"Single Mom with Children 5-17": 7,
		"Families Below Poverty Line Without Children 5-17": 7,
		"Families Below Poverty Line With Children 5-17": 7
	},
    "reportSpecification" : {
        reportName: "grid_poverty",
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
