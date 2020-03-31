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
    
    displayDemographicInfo(data, data.names[0]);
}

function refreshData(testSubjectID)
{
    d3.json(bellyButtonData).then(data => {

        displayDemographicInfo(data, testSubjectID);
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