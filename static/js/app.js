bellyButtonData = "data/samples.json";

d3.json(bellyButtonData).then(data => {

        // Populate the Test Subject IDs in the dropdown list based on available data
        populateTestSubjectIDs(data);
    });

function populateTestSubjectIDs(data)
{
    // Get a reference to the Test Subject IDs dropdown list
    var testSubjectsFilter = d3.select("#selDataset");
    
    // Populate the dropdown list with the Test Subject IDs from the dataset
    testSubjectsFilter.selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .text(name => {
            return name;
        });
    
    testSubjectID = data.names[0];
    displayDemographicInfo(data, testSubjectID);
    displayTopTenOTUs(data, testSubjectID);
    displayBubbleChart(data, testSubjectID);
    displayGaugeChart(data, testSubjectID);
}

function refreshData(testSubjectID)
{
    d3.json(bellyButtonData).then(data => {

        displayDemographicInfo(data, testSubjectID);
        displayTopTenOTUs(data, testSubjectID);
        displayBubbleChart(data, testSubjectID);
        displayGaugeChart(data, testSubjectID);
    });
}

function displayDemographicInfo(data, testSubjectID)
{
    var demographicInfo = d3.select("#sample-metadata");

    data.metadata.map(metaData => {
        if (metaData.id == testSubjectID)
            {
                demographicInfo.selectAll("p").remove();
                demographicInfo.append("p").text("ID: " + metaData.id);
                demographicInfo.append("p").text("Ethnicity: " + metaData.ethnicity);
                demographicInfo.append("p").text("Gender: " + metaData.gender);
                demographicInfo.append("p").text("Age: " + metaData.age);
                demographicInfo.append("p").text("Location: " + metaData.location);
                demographicInfo.append("p").text("BBType: " + metaData.bbtype);
                demographicInfo.append("p").text("WFreq: " + metaData.wfreq);
            }
    });
}

function displayTopTenOTUs(data, testSubjectID)
{
    data.samples.map(sample => {
        if (sample.id == testSubjectID)
            {
                otuIDs = sample.otu_ids.map(otuID => {
                    return ("OTU " + otuID);
                });
                sampleValues = sample.sample_values.map(sampleValue => {
                    return sampleValue;
                });
                otuLabels = sample.otu_labels.map(otuLabel => {
                    return otuLabel;
                });
            }
    });

    otuIDs = otuIDs.slice(0, 10).reverse();
    sampleValues = sampleValues.slice(0, 10).reverse();
    otuLabels = otuLabels.slice(0, 10).reverse();

    var trace = [{
        type: 'bar',
        x: sampleValues,
        y: otuIDs,
        text: otuLabels,
        orientation: 'h'
      }];
    
    var layout = {
        title: ('Top ' + sampleValues.length + ' OTUs for Subject ID: ' + testSubjectID)
    }  
    Plotly.newPlot('bar', trace, layout);
}

function displayBubbleChart(data, testSubjectID)
{
    data.samples.map(sample => {
        if (sample.id == testSubjectID)
            {
                otuIDs = sample.otu_ids.map(otuID => {
                    return otuID;
                });
                sampleValues = sample.sample_values.map(sampleValue => {
                    return sampleValue;
                });
                otuLabels = sample.otu_labels.map(otuLabel => {
                    return otuLabel;
                });
            }
    });

    var trace = [{
        x: otuIDs,
        y: sampleValues,
        mode: 'markers',
        marker: {
            color: otuIDs,
            size: sampleValues,
        },
        text: otuLabels
    }];
            
      var layout = {
        title: 'Sample Size',
    };
      
    Plotly.newPlot('bubble', trace, layout);
}

function displayGaugeChart(data, testSubjectID)
{
    data.metadata.map(metaData => {
        if (metaData.id == testSubjectID) {
            washingFrequency = metaData.wfreq;
        }
    });

    var data = [{
        type: "indicator",
        mode: "gauge+number",
        value: washingFrequency,
        title: { text: "Belly Button Washing Frequency", font: { size: 18 } },
        gauge: {
            axis: { range: [null, 9]},
            bar: { color: "orange" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "white",
            steps: [
                { range: [0, 1], color: "#00ffff", text: "0-1" },
                { range: [1, 2], color: "#00e7f2" },
                { range: [2, 3], color: "#00cfe3" },
                { range: [3, 4], color: "#00b8d3" },
                { range: [4, 5], color: "#00a1c1" },
                { range: [5, 6], color: "#008bad" },
                { range: [6, 7], color: "#007599" },
                { range: [7, 8], color: "#006083" },
                { range: [8, 9], color: "#004c6d" }
            ]
        }
    }];
    
    var layout = {
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        // font: { color: "black", family: "Arial" }
      };
    
    Plotly.newPlot('gauge', data, layout);    
}