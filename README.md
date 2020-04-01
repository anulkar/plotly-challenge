
# Belly Button Biodiversity: Interactive Dashboard

Built an [interactive dashboard](https://anulkar.github.io/plotly-challenge) using [JavaScript code](https://github.com/anulkar/plotly-challenge/blob/master/static/js/app.js), D3 and Plotly libraries to explore the [Belly Button Biodiversity dataset](https://github.com/anulkar/plotly-challenge/blob/master/data/samples.json), which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

1. Used the D3 library to read in [`samples.json`](https://github.com/anulkar/plotly-challenge/blob/master/data/samples.json).

2. The dashboard displays sample metadata for the selected test subject, i.e. an individual's demographic information (displayed each key-value pair from the metadata JSON object of the dataset).

3. Created the following Plotly charts. All of the plots are updated whenever a new sample (test subject) is selected from the dropdown list.

   * Horizontal bar chart to display the top 10 OTUs found in the test subject.
   * Bubble chart that displays each sample.
   * Gauge chart to plot the weekly washing frequency of the individual.
