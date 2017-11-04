// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['table']});
google.setOnLoadCallback(drawNormalizedChart);
google.setOnLoadCallback(drawChart);

// this has to be a global function
function drawNormalizedChart() {
   // grab the CSV
   $.get("originalData/BBCDiseaseNormalizedData.csv", function(csvString) {
      // transform the CSV string into a 2-dimensional array
      var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
	  //console.log(arrayData);

      // this new DataTable object holds all the data
      var data = new google.visualization.arrayToDataTable(arrayData);
	  //console.log(data);
	  
	  //start draw disease name table, only 1 column for storing all disease names
	  var table_title="";
	  var table_data = new google.visualization.DataTable();
	  var table_title_array = [];
	  
	  table_data.addColumn('string', 'Disease Name');
	  
	  for(i=1;i<arrayData[0].length;i++){
		  table_title = data.getColumnLabel(i);
		  table_title_array.push(table_title);
	  }
	  
	  table_data.addRows(arrayData[0].length-1); 
	  for(i=0;i<table_title_array.length;i++){
		  table_data.setCell(i,0,table_title_array[i].toString());
	  }
	  
      var select = document.getElementById("disease_select_list");
	 	 
	  for(i=0;i<table_title_array.length;i++){
		  var option = document.createElement("option");
	  	option.text = table_title_array[i].toString();
		option.value = i+1;//column index start from 1
	  	option.id = table_title_array[i].toString();//disease name
		select.appendChild(option);
	  }

     // set chart options
     var options = {
        title: "BBC disease frequency",
		width:1050,
		height:350,
		curveType: 'function',
        hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
        vAxis: {title: "Frequency", minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
        legend: 'none'
     };

     // create the chart object and draw it
     var chart = new google.visualization.LineChart(document.getElementById('normalizedChart'));
     

	 var column_index = [0];//0 means column date
		$('#disease_select_list').on('change',function() {//draw chart for multiselected diseases
		  
		  console.log($(this).val());
	      var view = new google.visualization.DataView(data);
		  var columns = $(this).val();
		  
		  for(var i=0;i<$(this).val().length;i++){
			  column_index.push(parseInt(columns[i]));//store all column number in a int array
		  }
		  
		  console.log(column_index);
	      view.setColumns(column_index); //Specifies which columns are visible in this view. 
	      chart.draw(view, options);
		  column_index = [0];
		});

	  	 
  });
}

function drawChart() {
   // grab the CSV
   $.get("originalData/BBCDiseaseData.csv", function(csvString) {
      // transform the CSV string into a 2-dimensional array
      var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});


      // this new DataTable object holds all the data
      var data = new google.visualization.arrayToDataTable(arrayData);
	  
	  
	  //start draw disease table
	  var table_title="";
	  var table_data = new google.visualization.DataTable();
	  var table_title_array = [];
	  
	  table_data.addColumn('string', 'Disease Name');
	  
	  for(i=1;i<arrayData[0].length;i++){
		  table_title = data.getColumnLabel(i);
		  table_title_array.push(table_title);
	  }
	  
	  table_data.addRows(arrayData[0].length-1); 
	  for(i=0;i<table_title_array.length;i++){
		  table_data.setCell(i,0,table_title_array[i].toString());
	  }
	  
      var select = document.getElementById("disease_select_list");
	 	 
	  for(i=0;i<table_title_array.length;i++){
		  var option = document.createElement("option");
	  	option.text = table_title_array[i].toString();
		option.value = i+1;//column index start from 1
	  	option.id = table_title_array[i].toString();//disease name
		select.appendChild(option);
	  }

     // set chart options
     var options = {
        title: "BBC disease count",
		width:1050,
		height:350,
		curveType: 'function',
        hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
        vAxis: {title: "Times by month", minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
		legend: 'none'
     };

     // create the chart object and draw it
     var chart = new google.visualization.LineChart(document.getElementById('chart'));
     

	 var column_index = [0];//0 means column date
		$('#disease_select_list').on('change',function() {
		  
		  console.log($(this).val());
	      view = new google.visualization.DataView(data);
		  var columns = $(this).val();
		  
		  for(var i=0;i<$(this).val().length;i++){
			  column_index.push(parseInt(columns[i]));//store all column number in a int array
		  }
		  
		  console.log(column_index);
	      view.setColumns(column_index); //Specifies which columns are visible in this view. 
	      chart.draw(view, options);
		  column_index = [0];
		});

	  	 
  });
}
