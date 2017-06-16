var data = {
    "political-affiliation": {
      /*I need percentages of total.*/
      "republican": "20%",
      "democratic": "70%",
      "unaffiliated": "10%",
    },
    "race": {
        /*I need percentages of total.*/
      "black": "20%",
      "white": "30%",
      "other": "40%",
    },
    "income": "700,000",
    "reportSpecification" : {
       reportName: "gerrymander",
       geoJSON: {
           type: "Feature",
           geometry: {
               coordinates: [-79.523149,36.095723],
               radius: 160,
               type: "Point"
           },
           properties: {
               "address" : "204 Windrift Drive, Gibsonville, NC"
           }
       }
   }
}
