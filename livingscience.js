///**
// * the javascript function to preform the basic livingscience search
// */
//
//var lsObject = new Array();
//var query = new Array();
//var currentPage = new Array();
//
//function lsSearch(idSuffix) {
//
//	uidList = "";
//	userListCheckboxes = jQuery('#user_list-list-'+idSuffix+' input:checked').each(function(index){
//		//userListCheckboxes = jQuery("#user_list-list-"+idSuffix).find(':checkbox:checked').each(function(index){
//		uidList += jQuery(this).attr("value") + "_";
//		// TODO handle this part to have a better search quiery. Look for the username/first name/last name
////		query[idSuffix] += jQuery(this).parent().parent().next().next().next().next().next().next().text();
////		query[idSuffix] += " ";
////		query[idSuffix] += jQuery(this).parent().parent().next().next().next().next().next().next().next().text() + " ";
//		
//	});
//	uidList = uidList.slice(0, -1);
//	
//	var urlAdd = "";
//	// TODO find a better solution
//	// checking if clean urls are used or not
//	if (location.href.indexOf("?q=") != -1) {
//		urlAdd = "?q=";
//	}
//	var url = location.href.substring(0,location.href.lastIndexOf("?q=")) + urlAdd + "livingscience/get_author_names/" + uidList;
//	
//	jQuery.ajax({
//	  url: url,
//	  data: null,
//	  success: function( data, status, xhr ) {
//		// Adding/moveing the data from autocompleteCheckedItems to the very end
//		// TODO data comes as a JSON formatted list of full names. Interpret this data and send to the search query
//		var dataArray = eval(data);
//		// Check if this autocompletion type is the same or not
//		// If not the same, we do not load any preselected results
//		query[idSuffix] = dataArray.join(",");
//		console.log("query: " + query[idSuffix]);
//		if(lsObject[idSuffix] == null)
//		{
//			lsObject[idSuffix] = new ch.ethz.livingscience.gwtclient.api.LivingScienceSearch();
//			// TODO this "-1" should be replaced by a count, because why might want to have maps or whataver in multiple windows within a dialog
//			lsObject[idSuffix].setMap("mapcontainer-"+idSuffix+"-1");
//		}
//		if (!lsObject[idSuffix]) return;
//		document.getElementById("watchProgress-"+idSuffix+"-1").innerHTML = "Please wait...";
//		document.getElementById("searchResults-"+idSuffix+"-1").innerHTML = "";
//		lsObject[idSuffix].searchAuthor(query[idSuffix], function(publications) 
//		{
//			var numberOfResults = lsObject[idSuffix].getTotalResults();
//			// Create the pagination links
//			makePagination(numberOfResults, 10, idSuffix);
//			
//			var shortInfo =  "<p>" + numberOfResults + " results for: "+query[idSuffix]+"</p>";
//			var authorIndices = lsObject[idSuffix].getAuthorStats();
//			if (authorIndices)
//			{
//				shortInfo += "<p>H-Index: " + authorIndices.hindex+ " | G-Index: " + authorIndices.gindex+ " | Total Citations: " + authorIndices.citationcount+ "</p>";
//			}
//			shortInfo += "<p id=\"authorImage" + idSuffix + "\" />";
//			document.getElementById("watchProgress-"+idSuffix+"-1").innerHTML = shortInfo;
//			
//			// display result list
//			lsPage(1, numberOfResults, 10, idSuffix);
//			currentPage[idSuffix] = 1;
////			lsObject[idSuffix].generateList(0, 10,  "searchResults-"+idSuffix+"-1");
//			
//			// search for an author image
//			lsObject[idSuffix].addAuthorImage("authorImage" + idSuffix, 100); // 100 px is image width
//		});
//	  }
//	});
//}
//
///**
// * Function responsible for changing the page
// * @param pg the page to change to
// * @param total number of total results
// * @param perpage how many results to show per page
// * @param idSuffix the idSuffix of the dialog window
// */
//function lsPage(pg, total, perpage, idSuffix) {
//	numberOfPages = Math.floor(total/perpage)+1;
//	if (pg == "next") {
//		pg = currentPage[idSuffix] + 1;
//		if (pg > numberOfPages) return false;
//	} else if (pg == "prev") {
//		pg = currentPage[idSuffix] - 1;
//		if (pg == 0) return false;
//	}
//	document.getElementById("searchResults-"+idSuffix+"-1").innerHTML = "";
//	lsObject[idSuffix].generateList((pg-1)*perpage, pg*perpage,  "searchResults-"+idSuffix+"-1");
//	currentPage[idSuffix] = pg;
//	highlightCurrent(pg);
//}
//
///**
// * Function responsible for creating the pagination links based on the number of results
// * and results per page
// * @param total total number results
// * @param perpage how many to show per page
// * @param idSuffix idSuffix of the dialog window
// */
//function makePagination(total, perpage, idSuffix) {
//	numberOfPages = Math.floor(total/perpage)+1;
//	divId = "ls-pagination-"+idSuffix+"-1";
//	output = "<ul><li style='display: inline; list-style-type: none; padding-right: 5px;' onclick='lsPage(&quot;prev&quot;, "+total+", "+perpage+", "+idSuffix+")'><a class='ls-pagination' href='#'><< prev</a></li>";
//	for (i=1; i <= numberOfPages; i++) {
//		output += "<li style='display: inline; list-style-type: none; padding-right: 5px;' onclick='lsPage("+i+", "+total+", "+perpage+", "+idSuffix+")'><a class='ls-pagination' id='ls-pagination-"+i+"' href='#'>"+i+"</a></li>";		
//	}
//	output += "<li style='display: inline; list-style-type: none; padding-right: 5px;' class='pagination' onclick='lsPage(&quot;next&quot;, "+total+", "+perpage+", "+idSuffix+")'><a class='ls-pagination' href='#'>next >></a></li></ul>";
//	jQuery("#"+divId).html(output);
//}
//
///**
// * Function to highlight the currently selected page
// * @param pg
// */
//function highlightCurrent(pg) {
////	liId = "ls-pagination-"+pg;
//	jQuery(".ls-pagination").css("text-decoration", "none");
//	jQuery("#"+liId).css("text-decoration", "underline");
//}