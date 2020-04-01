// URL that points to the json dataset on your localhost
bellyButtonData = "data/samples.json";

// Read the JSON dataset using d3
d3.json(bellyButtonData).then(data => {
        // Call function to populate the Test Subject IDs on the HTML page
        populateTestSubjectIDs(data);
    });
/*
--------------------------------------------------------------------------------
Function that populates the Test Subject IDs in a dropdown list on the HTML page
--------------------------------------------------------------------------------
*/
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
    
    // Grab the first Test Subject ID
    testSubjectID = data.names[0];
    // Call function to display demographic data for the Test Subject ID
    displayDemographicInfo(data, testSubjectID);
    // Call function to plot top ten OTUs for the Test Subject ID as a bar chart
    displayTopTenOTUs(data, testSubjectID);
    // Call function to plot a bubble chart of the OTUs for the Test Subject ID
    displayBubbleChart(data, testSubjectID);
    // Call function to plot a gauge chart of the weekly washing frequency of the individual
    displayGaugeChart(data, testSubjectID);
}

/*
-------------------------------------------------------------------------------------
Function to display/refresh the data and charts on the HTML page.
Calls other functions when a new Test Subject ID is selected from the dropdown list.  
-------------------------------------------------------------------------------------
*/
function refreshData(testSubjectID)
{
    d3.json(bellyButtonData).then(data => {
        // Call function to display demographic data for the Test Subject ID
        displayDemographicInfo(data, testSubjectID);
        // Call function to plot top ten OTUs for the Test Subject ID as a bar chart
        displayTopTenOTUs(data, testSubjectID);
        // Call function to plot a bubble chart of the OTUs for the Test Subject ID
        displayBubbleChart(data, testSubjectID);
        // Call function to plot a gauge chart of the weekly washing frequency of the individual
        displayGaugeChart(data, testSubjectID);
    });
}

/*
---------------------------------------------------------------------------------
Function to display demographic metadata for the selected Test Subject ID
---------------------------------------------------------------------------------
*/
function displayDemographicInfo(data, testSubjectID)
{
    // Get a reference to the panel element that displays the demographic data 
    var demographicInfo = d3.select("#sample-metadata");

    // Retrieve the demographic metadata from the dataset based on matching Test Subject ID
    data.metadata.map(metaData => {
        if (metaData.id == testSubjectID)
            {
                // Display metadata in paragraph elements on the HTML page 
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

/*
-----------------------------------------------------------------------------
Function to plot top 10 OTUs for the selected Test Subject ID as a bar chart
-----------------------------------------------------------------------------
*/
function displayTopTenOTUs(data, testSubjectID)
{
    // Retrieve OTU IDs, sample values and OTU labels from the dataset based on matching Test Subject ID
    // Store data into respective arrays
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

    // Slice the arrays to grab the first 10 data points for each
    // Reverse the arrays to display data in descending order (pre-sorted in JSON)
    otuIDs = otuIDs.slice(0, 10).reverse();
    sampleValues = sampleValues.slice(0, 10).reverse();
    otuLabels = otuLabels.slice(0, 10).reverse();

    // Build the trace for the bar chart
    var trace = [{
        type: 'bar',
        x: sampleValues,
        y: otuIDs,
        text: otuLabels,
        orientation: 'h'
      }];
    
    // Build the layout for the bar chart
    var layout = {
        title: ('Top ' + sampleValues.length + ' OTUs for Subject ID: ' + testSubjectID)
    }

    // Render the bar chart using plotly
    Plotly.newPlot('bar', trace, layout);
}

/*
-----------------------------------------------------------------------------
Function to plot a bubble chart of all OTUs for the selected Test Subject ID
-----------------------------------------------------------------------------
*/
function displayBubbleChart(data, testSubjectID)
{
    // Retrieve OTU IDs, sample values and OTU labels from the dataset based on matching Test Subject ID
    // Store data into respective arrays
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

    // Build the trace for the bubble chart
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
    
    // Build the layout for the bubble chart
    var layout = {
        title: 'All OTUs in the Sample',
    };
      
    // Render the bubble chart using plotly
    Plotly.newPlot('bubble', trace, layout);
}

/*
----------------------------------------------------------------------------------
Function to plot a gauge chart of the weekly washing frequency of the individual
----------------------------------------------------------------------------------
*/
function displayGaugeChart(data, testSubjectID)
{
    // Retrieve the washing frequency of the matching subject ID
    data.metadata.map(metaData => {
        if (metaData.id == testSubjectID) {
            washingFrequency = metaData.wfreq;
        }
    });

    // Build the gauge chart
    var data = [{
        type: "indicator",
        mode: "gauge+number",
        value: washingFrequency,
        title: { text: "Belly Button Washing Frequency" + "<br>" + "(Scrubs per Week)", font: { size: 18 } },
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
    
    // Build the layout for the gauge chart
    var layout = {
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
      };
    
    // Plot the gauge chart using plotly
    Plotly.newPlot('gauge', data, layout);    
}