angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http, ChartJsProvider){



	// ###################### Question 4
	// Associate your sparql endpoint to a scope variable. Add the "/query?query=" parameter after the variable
	$scope.mysparqlendpoint = "http://localhost:7200/repositories/test?query="



	// ###################### Question 5
	// Create 2 different data visualisations based on two SPARQL queries
	// For each of the visualisation:
	// (1) Run the SPARQL query on the console
	// (2) Copy the SPARQL results a scope variable, ex. $scope.myresult = []
	// (3) Associate the SPARQL query to another scope variable, ex. $scope.myquery = "myquery"
	// Examples :
	// ex1 : a piechart of the most frequent classes,
	// ex2 : a barplot of the most frequent properties

	$scope.visualisationData1 ;
	$scope.sparqlquery1 = 'SELECT ?class (COUNT(?s) as ?c) where {?s a ?class} group by ?class';
  $scope.myInstances1 = [98, 98, 67, 26, 10, 9];
  $scope.myClasses1 = [ "bro:Car","qe2:Automobile", "owl:namedIndividual","rdf:Property", "owl:Class", "owl:ObjectProperty"];

  $scope.sparqlquery2 = 'SELECT ?p (COUNT(?p) AS ?c) WHERE { ?s ?p ?class } GROUP BY ?p';
  $scope.myInstances2 = [354, 101, 101, 101, 45, 24,20];
  $scope.myProperties2 = [ "rdf:type","bro:makes", "bro:manufacturer","qe2:manufacturer", "rdfs:subClassOf", "rdfs:subPropertyOf","owl:equivalentClass"];

	$scope.visualisationData2 ;


	// use a third variable if you want to visualise labels
	$scope.visualisationLabels1 ;
	$scope.visualisationLabels2 ;

	$scope.myDynamicLabels = [];
	$scope.myDynamicData = [];


	// ###################### Question 6
	// Create an interaction with the triplestore by filling the following method
	// The function needs to include : some arguments sent by the html + an http call to the sparql endpoint + a variable storing the results to be visualised
	// use the native function encodeURI(mySparqlQuery) to encode your query as a URL

  $scope.fireInteraction = function(){
		console.log('calling ')
    $scope.result = "Here is my input: " +$scope.myInput;  // =  TODO

		console.log($scope.mysparqlendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'));
    $http( {
		 	method: "GET",
			url : $scope.mysparqlendpoint + encodeURI($scope.myInput).replace(/#/g, '%23'), // TODO : your endpoint + your query here,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			} )
			.success(function(data, status ) {
        console.log(data);
        $scope.resultQ2=data;
			      // TODO : your code here
		  })
			.error(function(error ){
			    console.log('Error '+error);
			});

		$scope.results = "Here is my input: " +$scope.myInput+"!";  // =  TODO


	};



}
