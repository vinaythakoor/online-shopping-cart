$(function() {
	
	 	$("#searchTerm").autocomplete({
			source: "searchAutocomplete", 
			minLength: 1
			
		});
	 
	 	$('#pagination-here').bootpag({
	 	    total: 10,          // total pages
	 	    page: 1,            // default page
	 	    maxVisible: 10,     // visible pagination
	 	    leaps: true         // next/prev leaps through maxVisible
	 	}).on("page", function(event, num){
	 	    $("#content").html("Page " + num); // or some ajax content loading...
	 	    // ... after content load -> change total to 10
	 	    $(this).bootpag({total: 10, maxVisible: 10});
	 	});
 
	 	
	/*	
	$('.checksave').change(function() {
        //alert('checksave');
		var button = document.getElementById('submitslider');
		button.form.submit();

		$("#searchTerm2").val(localStorage.getItem('searchvalue'));
		document.forms["#sliderForm"].submit();

		var employeeData = {};
		employeeData["searchTerm"] = localStorage.getItem('searchvalue'),
		employeeData["txtMinAge"] = localStorage.getItem('txtMinAge'),
		employeeData["txtMaxAge"] = localStorage.getItem('txtMaxAge'),
		employeeData["brands"] = JSON.parse(localStorage.getItem('brands'));
		
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "search22",
			data : JSON.stringify(employeeData),
			dataType : 'json',				
			success : function(data) {
				$('#processedData').html(JSON.stringify(data));
				$('#displayDiv').show();
			}
		});
	});

	
	jQuery(document).ready(function($) {

		$("#submitemp").click(function(){
		 
			var employeeData = {};
			employeeData["searchTerm"] = localStorage.getItem('searchvalue'),
			employeeData["txtMinAge"] = localStorage.getItem('txtMinAge'),
			employeeData["txtMaxAge"] = localStorage.getItem('txtMaxAge'),
			employeeData["brands"] = JSON.parse(localStorage.getItem('brands'));
			
			$.ajax({
				type : "POST",
				contentType : "application/json",
				url : "postEmployee",
				data : JSON.stringify(employeeData),
				dataType : 'json',				
				success : function(data) {
					$('#processedData').html(JSON.stringify(data));
					$('#displayDiv').show();
				}
			});
		
		});

	});
	*/
});	