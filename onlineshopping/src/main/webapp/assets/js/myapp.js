$(function() {

	// solving the active menu problem
	switch (menu) {

	case 'About Us':
		$('#about').addClass('active');
		break;

	case 'Contact Us':
		$('#contact').addClass('active');
		break;

	case 'All Products':
		$('#listproducts').addClass('active');
		break;

	case 'Product Management':
		$('#manageProduct').addClass('active');
		break;

	case 'Shopping Cart':
		$('#userModel').addClass('active');
		break;

	default:
		if (menu == "home")
			break;
		$('#listproducts').addClass('active');
		$('#a_' + menu).addClass('active');
		break;

	}

	// for handling CSRF token
	var token = $('meta[name="_csrf"]').attr('content');
	var header = $('meta[name="_csrf_header"]').attr('content');

	if ((token != undefined && header != undefined)
			&& (token.length > 0 && header.length > 0)) {
		// set the token header for the ajax request
		$(document).ajaxSend(function(e, xhr, options) {
			xhr.setRequestHeader(header, token);
		});
	}

	// code for jquery dataTable

	var $table = $('#productListTable');
	// excute the below code only where we have this table

	if ($table.length) {

		// console.log('inside the table');

		var jsonUrl = '';
		if (window.categoryId == '') {

			jsonUrl = window.contextRoot + '/json/data/all/products';
		} else {
			jsonUrl = window.contextRoot + '/json/data/category/'
					+ window.categoryId + '/products';
		}

		$table
				.DataTable({

					lengthMenu : [ [ 3, 5, 10, -1 ],
							[ '3 Records', '5 Records', '10 Records', 'ALL' ] ],
					pageLength : 2,

					ajax : {
						url : jsonUrl,
						dataSrc : ''
					},

					columns : [
							{
								data : 'code',
								mRender : function(data, type, row) {
									return '<img src="' + window.contextRoot
											+ '/resources/images/' + data
											+ '.jpg" class="dataTableImg"/>';
								}
							},
							{
								data : 'name'
							},
							{
								data : 'brand'
							},
							{
								data : 'unitPrice',

								mRender : function(data, type, row) {
									return '&#8377; ' + data
								}
							},
							{
								data : 'quantity',
								mRender : function(data, type, row) {
									if (data < 1) {
										return '<span style="color:red">Out of Stock!</span>';
									}
									return data;
								}
							},
							{
								data : 'id',
								bSortable : false,
								mRender : function(data, type, row) {
									var str = '';
									str += '<a href = "'
											+ window.contextRoot
											+ '/show/'
											+ data
											+ '/product" class="btn btn-primary rounded "><i class="far fa-eye"></i></a> &#160;';

									if (userRole == 'ADMIN') {
										str += '<a href = "'
												+ window.contextRoot
												+ '/manage/'
												+ data
												+ '/product" class="rounded btn btn-warning"><i class="far fa-edit"></i></a>';

									} else {
										if (row.quantity < 1) {
											str += '<a href = "javascript:void(0)" class="rounded btn btn-success disabled"><i class="fas fa-cart-plus"></i></a>';
										} else {

											str += '<a href = "'
													+ window.contextRoot
													+ '/cart/add/'
													+ data
													+ '/product" class="rounded btn btn-success"><i class="fas fa-cart-plus"></i></a>';

										}
									}
									return str;
								}
							}

					]
				});
	}

	// dismissing the alert after 3 seconds

	var $alert = $('.alert');
	if ($alert.length) {

		setTimeout(function() {

			$alert.fadeOut('slow');

		}, 3000)

	}

	// ----------------------

	$('.switch input[type="checkbox"]')
			.on(
					'change',
					function() {

						var checkbox = $(this);
						var checked = checkbox.prop('checked');
						var dMsg = (checked) ? 'You want to activate the product?'
								: 'You want to deactivate the product?';

						var value = checkbox.prop('value');

						bootbox
								.confirm({
									size : 'medium',
									title : 'Product Activation & Deactivation',
									message : dMsg,
									callback : function(confirmed) {

										if (confirmed) {
											console.log(value);
											bootbox
													.alert({
														size : 'medium',
														title : 'Information',
														message : 'You are going to perform operation on product'
																+ value
													});
										} else {
											checkbox.prop('checked', !checked);
										}

									}

								});
					});

	// ---------------------------
	// data table for admin
	// ---------------------------

	var $productsTable = $('#productsTable');
	// excute the below code only where we have this table

	if ($productsTable.length) {

		// console.log('inside the table');

		var jsonUrl = window.contextRoot + '/json/data/admin/all/products';

		$productsTable
				.DataTable({

					lengthMenu : [ [ 10, 30, 50, -1 ],
							[ '10 Records', '30 Records', '50 Records', 'ALL' ] ],
					pageLength : 30,

					ajax : {
						url : jsonUrl,
						dataSrc : ''
					},

					columns : [
							{
								data : 'id'
							},
							{
								data : 'code',
								mRender : function(data, type, row) {
									return '<img src="'
											+ window.contextRoot
											+ '/resources/images/'
											+ data
											+ '.jpg" class="adminDataTableImg"/>';
								}
							},
							{
								data : 'name'
							},
							{
								data : 'brand'
							},
							{
								data : 'quantity',
								mRender : function(data, type, row) {
									if (data < 1) {
										return '<span style="color:red">Out of Stock!</span>';
									}
									return data;
								}
							},
							{
								data : 'unitPrice',

								mRender : function(data, type, row) {
									return '&#8377; ' + data
								}
							},
							{
								data : 'active',
								bSortable : false,
								mRender : function(data, type, row) {

									var str = '';

									str += '<label class="switch">';
									if (data) {
										str += '<input type="checkbox" checked="checked" value="'
												+ row.id + '" />';
									} else {
										str += '<input type="checkbox" value="'
												+ row.id + '" />';
									}

									str += '<div class="slider"></div></label>';

									return str;
								}
							},
							{
								data : 'id',
								bSortable : false,
								mRender : function(data, type, row) {

									var str = '';

									str += '<a href="'
											+ window.contextRoot
											+ '/manage/'
											+ data
											+ '/product" class="btn btn-warning">';
									str += '<i class="fas fa-edit"></i></a>';
									return str;
								}
							}

					],

					initComplete : function() {

						var api = this.api();

						api
								.$('.switch input[type="checkbox"]')
								.on(
										'change',
										function() {

											var checkbox = $(this);
											var checked = checkbox
													.prop('checked');
											var dMsg = (checked) ? 'You want to activate the product?'
													: 'You want to deactivate the product?';

											var value = checkbox.prop('value');

											bootbox
													.confirm({
														size : 'medium',
														title : 'Product Activation & Deactivation',
														message : dMsg,
														callback : function(
																confirmed) {

															if (confirmed) {
																console
																		.log(value);

																var activationUrl = window.contextRoot
																		+ '/manage/product/'
																		+ value
																		+ '/activation';

																$
																		.post(
																				activationUrl,
																				function(
																						data) {

																					bootbox
																							.alert({
																								size : 'medium',
																								title : 'Information',
																								message : data
																							});
																				});

															} else {
																checkbox
																		.prop(
																				'checked',
																				!checked);
															}

														}

													});
										});

					}

				});
	}

	// jQuery Validation Code

	// methods required for validation

	function errorPlacement(error, element) {
		// Add the 'help-block' class to the error element
		error.addClass("help-block");
		error.addClass("redError");
		// add the error label after the input element
		error.insertAfter(element);

		// add the has-feedback class to the
		// parent div.validate in order to add icons to inputs
		element.parents(".validate").addClass("has-feedback");

	}

	// validating the product form element
	// fetch the form element
	$categoryForm = $('#categoryForm');

	if ($categoryForm.length) {

		$categoryForm.validate({
			rules : {
				name : {
					required : true,
					minlength : 3
				},
				description : {
					required : true,
					minlength : 3
				}
			},
			messages : {
				name : {
					required : 'Please enter product name!',
					minlength : 'Please enter atleast five characters'
				},
				description : {
					required : 'Please enter product name!',
					minlength : 'Please enter atleast five characters'
				}
			},
			errorElement : "em",
			errorPlacement : function(error, element) {
				errorPlacement(error, element);
			}
		}

		);

	}

	// -------------------------

	// ---------------------------
	// validation code for login
	var $loginForm = $('#loginForm');
	if ($loginForm.length) {
		$loginForm.validate({
			rules : {
				username : {
					required : true,
					email : true
				},
				password : {
					requried : true
				}
			},
			messages : {
				username : {
					required : 'Please enter the username!',
					minlength : 'Please enter the valid email address'
				},
				password : {
					required : 'Please enter the password!'
				}
			},
			errorElement : 'em',
			errorPlacement : function(error, element) {
				// add the class of help-block
				error.addClass('help-block');
				error.addClass('redError');
				// add the error element after the input element
				error.insertAfter(element);
			}
		});
	}

	// -------------------------

	// handling the click event of refresh cart button

	$('button[name="refreshCart"]')
			.click(
					function() {

						// fetch the cart line id

						var cartLineId = $(this).attr('value');
						var countElement = $('#count_' + cartLineId);

						var originalCount = countElement.attr('value');
						var currentCount = countElement.val();

						if (currentCount !== originalCount) {

							if (currentCount < 1 || currentCount > 3) {

								// reverting back to the original count
								// user has given value below 1 and above 3

								countElement.val(originalCount);
								bootbox
										.alert({
											size : 'medium',
											title : 'Error',
											message : 'Product count should be minimum 1 and maximum 3!'
										});
							} else {
								var updateUrl = window.contextRoot + '/cart/'
										+ cartLineId + '/update?count='
										+ currentCount;

								// forward it to the controller
								window.location.href = updateUrl;
							}
						}

					});

	// -------------------------

	/*------*/
	/* handle refresh cart */
	$('button[name="refreshCart"]')
			.click(
					function() {
						var cartLineId = $(this).attr('value');
						var countField = $('#count_' + cartLineId);
						var originalCount = countField.attr('value');
						// do the checking only the count has changed
						if (countField.val() !== originalCount) {
							// check if the quantity is within the specified
							// range
							if (countField.val() < 1 || countField.val() > 3) {
								// set the field back to the original field
								countField.val(originalCount);
								bootbox
										.alert({
											size : 'medium',
											title : 'Error',
											message : 'Product Count should be minimum 1 and maximum 3!'
										});
							} else {
								// use the window.location.href property to send
								// the request to
								// the server
								var updateUrl = window.contextRoot + '/cart/'
										+ cartLineId + '/update?count='
										+ countField.val();
								window.location.href = updateUrl;
							}
						}
					});

/*	// validation code for login	
	var $searchform = $('#searchform');
	if ($searchform.length) {
		$searchform.validate({
			rules : {
				searchTerm : {
					required : true,
				}
			},
			messages : {
				searchTerm : {
					required : '',
					minlength : ''
				}
			},
			errorElement : 'em',
			errorPlacement : function(error, element) {
				// add the class of help-block
				error.addClass('help-block');
				error.addClass('redError');
				// add the error element after the input element
				error.insertAfter(element);
			}
		});
	}*/
  	  
	$(document).ready(function(){
	    $('#submitsearch').attr('disabled',true);
	    $('#searchTerm').keyup(function(){
	        if($(this).val().length !=0)
	            $('#submitsearch').attr('disabled', false);            
	        else
	        	$('#submitsearch').attr('disabled',true);
	    })
	});
	
	$("#submitsearch").click(function() {
		localStorage.setItem('searchvalue', $('#searchTerm').val());
		localStorage.setItem('txtMinAge', '200');
		localStorage.setItem('txtMaxAge', '10000000');
	});
  
	  
	/* attach a submit handler to the form */
	$("#searchForm").submit(
			function(event) {
				// alert('if');

				/* stop form from submitting normally */
				// event.preventDefault();
				/* get some values from elements on the page: */
				var $form = $(this), searchTerm = $form.find(
						'input[name="searchTerm"]').val(), url = $form
						.attr('action');

				/* Send the data using post */
				var posting = $.post(url, {
					searchTerm : searchTerm
				});

				/* Put the results in a div */
				posting.done(function(data) {
					var content = $(data).find('#content');
					$("#result").empty().append(content);
				});

			});


	 $("#loginAjaxForm").submit(function(event) {

	      /* stop form from submitting normally */
	      event.preventDefault();
	      var employeeData = {};
	      
	      employeeData["email"] = $('#email').val(),
	      employeeData["password"] = $('#password').val()
	      var formData = JSON.stringify(employeeData);
	      $.ajax({
	    	  type: "POST",
	    	  url: "login",
	    	  data: formData,
	    	  success: function(){},
	    	  dataType: "json",
	    	  contentType : "application/json",
	    	  success: function(data){
	    	        alert("hiii");
	    	   },
	    	  success : function(data) {
	    		  if(result === "no_errors") location.href = "http://localhost:8080/onlineshopping/"
				}
	    	});
	      
	   /*   $.ajax({
				type : "POST",
				contentType : "application/json",
				url : "search22",
				data : JSON.stringify(employeeData),
				dataType : 'json',				
				success : function(data) {
					$('#processedData').html(JSON.stringify(data));
					$('#displayDiv').show();
				}
			});*/
	    });
	
	function myFunction() {
		$("#searchTerm").val(localStorage.getItem('searchvalue'));
		alert('if');
	}
	
	$(document).ready(function () {
	    if (sessionStorage.getItem('checked-checkboxes') && $.parseJSON(sessionStorage.getItem('checked-checkboxes')).length !== 0)
	    {
	        var arrCheckedCheckboxes = $.parseJSON(sessionStorage.getItem('checked-checkboxes'));
	        //Convert checked checkboxes array to comma seprated id
	        $(arrCheckedCheckboxes.toString()).prop('checked', true);
	    }
	    $("input:checkbox").change(function () {
	        var arrCheckedCheckboxes = [];
	        // Get all checked checkboxes
	        $.each($("input:checkbox:checked"), function () {
	            arrCheckedCheckboxes.push("#" + $(this).attr('id'));
	        });
	        // Convert checked checkboxes array to JSON ans store it in session storage
	        sessionStorage.setItem('checked-checkboxes', JSON.stringify(arrCheckedCheckboxes));
	    });
	});
	
 	//save checkbox value in localstorage
/*	$(':checkbox[name=brand]').on('change', function() {
		var assignedTo = $(':checkbox[name=brand]:checked').map(function() {
			return this.id;
		}).get();

		document.getElementById("demo").innerHTML =
			"The total is: " + assignedTo;
		// $('pre.out').text( JSON.stringify( assignedTo ) );
		localStorage.setItem('brands', JSON.stringify(assignedTo));
		var myArray = new Array();
		myArray = JSON.parse(localStorage.getItem('brands'));
		 
		document.getElementById("demo").innerHTML =
			"The total is: " + myArray;
	});*/
	//
	 
	// slider ----
	$(document).ready(
			function() {
				var outputSpan = $('#spanOutput');
				var form = $("#searchForm")
				var sliderDiv = $('#slider');
				var start;

				if ((localStorage.getItem('txtMinAge') && localStorage
						.getItem('txtMaxAge')) == null) {
					start = [ 200, 10000000 ];
				} else {
					start = [ localStorage.getItem('txtMinAge'),
							localStorage.getItem('txtMaxAge') ];
				}

				sliderDiv.slider({
					range : true,
					min : 100,
					max : 10000000,
					values : start,
					slide : function(event, ui) {

						outputSpan.html(ui.values[0] + ' - ' + ui.values[1]);
						$('#txtMinAge').val(ui.values[0]);
						$('#txtMaxAge').val(ui.values[1]);

						localStorage.setItem('txtMinAge', ui.values[0]);
						localStorage.setItem('txtMaxAge', ui.values[1]);
						// load_product(ui.values[0], ui.values[1]);
					},
					stop : function(event, ui) {
						test();
					}
				});

				outputSpan.html(sliderDiv.slider('values', 0) + ' - '
						+ sliderDiv.slider('values', 1));
				$('#searchTerm2').val(localStorage.getItem('searchvalue'));
				$('#txtMinAge').val(localStorage.getItem('txtMinAge'));
			    $('#txtMaxAge').val(localStorage.getItem('txtMaxAge'));

				$("#reset").click(function() {
					localStorage.setItem('txtMinAge', '200');
					localStorage.setItem('txtMaxAge', '100000');
					location.reload();
				});
				
				//submit form on checkbox change
				$('.checksave').change(function() {
			        //alert('checksave');
 
					var button = document.getElementById('submitslider');
					button.form.submit();

					$("#searchTerm2").val(localStorage.getItem('searchvalue'));
					document.forms["#sliderForm"].submit();
 
				});
  				
				//submit form
				function test() {
					// var searchTerm = $('#searchTerm');
 					 
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
					
//					$.ajax({
//						type : "POST",
//						url : "search22",
//						data : {
//							searchTerm : localStorage.getItem('searchvalue'),
//							txtMinAge : localStorage.getItem('txtMinAge'),
//							txtMaxAge : localStorage.getItem('txtMaxAge'),
//							brands : localStorage.getItem('brands')
//							
//						}, // parameters
//						success : function(result) {
//							// alert('changed');
// 						}
//					});
				}

			});

	// main function ---------------
});

  