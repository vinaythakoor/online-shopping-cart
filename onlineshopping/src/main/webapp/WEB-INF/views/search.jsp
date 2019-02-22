<!-- DataTable Bootstrap Script -->
<script src="${js}/angular.js"></script>
<!-- DataTable Bootstrap Script -->
<script src="${js}/productsController.js"></script>

<%!String searchslide;%>

<%
	searchslide = request.getParameter("searchTerm2");
	/* String[] brands = request.getParameterValues("brand"); */
%>
<div class="container-fluid" ng-app="ShoppingApp"
	ng-controller="ProductController as pCtrl">

	<div class="row mt-2" ng-init="pCtrl.fetchProducts()">

		<div class="col-3 col-sm-3 col-md-3 col-lg-3">

			<div class="card h-100"
				style="background: white; height: 800px; border: none;">

				<h3 class="ml-2 mt-2">Filters</h3>
				<hr>
				<h5 class="ml-2 mt-2">Price Range</h5>
				<hr>

				<p id="demo"></p>

				<form class="form-group" action="${contextRoot}/search"
					id="sliderForm">

					<div class="row card-body text-center">
						<div class="col-12 col-sm-12 col-md-12 col-lg-12">
							Price : <span id="spanOutput"></span>
						</div>

						<div class="col-12 col-sm-12 col-md-12 col-lg-12 mt-3 mb-3 ui">
							<div class="form-control uislide" id="slider"></div>
						</div>

						<div class="col-12 col-sm-12 col-md-12 col-lg-6 mb-3 d-none">
							<input class="form-control" type="hidden" id="searchTerm2"
								name="searchTerm" />
						</div>

						<div class="col-12 col-sm-12 col-md-12 col-lg-6 mb-3">
							<input class="form-control" type="text" id="txtMinAge"
								name="txtMinAge" />
						</div>

						<div class="col-12 col-sm-12 col-md-12 col-lg-6 mb-3">
							<input class="form-control" type="text" id="txtMaxAge"
								name="txtMaxAge" />

						</div>

						<div class="col-12 col-sm-12 col-md-12 col-lg-12">
							<button type="button" class="btn btn-primary btn-sm" id="reset"
								type="button" value="Reset">clear</button>
						</div>

						<div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 d-none">
							<button class="btn btn-secondary d-none" name="submitslider"
								id="submitslider" type="submit" value="Search"
								onclick="loadsearch()">
								<i class="fa fa-search"></i>
							</button>
						</div>

					</div>
					<hr>
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">

						<div class="card-body">

							<h5 class="ml-2">Brand</h5>

							<c:forEach items="${brandlist}" var="brand" varStatus="loop">
								<div class="custom-control custom-checkbox ml-2">
									<input type="checkbox" class="custom-control-input checksave"
										id="${brand}" name="brand[]" value="${brand}"
										onclick="toggleCheckbox(this)" autocomplete="off"> <label
										class="custom-control-label checkboxname" for="${brand}">${brand}</label>
								</div>
							</c:forEach>

							<pre id="whereToPrint"></pre>
						</div>
					</div>
					<hr>
				</form>
			</div>
		</div>

		<div class="col-9 col-sm-9 col-md-9 col-lg-9">

			<div id="load_product" class="row" ng-init="pCtrl.fetchProducts()">

				<c:forEach var="map" items="${searchResult}">

					<div class="col-4 col-lg-4 col-md-4 mb-2 text-center"
						style="background: white; ">
						<a ng-href="${contextRoot}/show/${map['id']}/product"
							style="text-decoration: none;" id="a_${map['name']}"> 
							<img ng-src="${images}/${map['code']}.jpg" alt="${product1.name}"
							class="img-responsive mt-4" style="margin: auto; height:200px;">
							<h5 class="text-center productprice mt-5">&#8377;
								${map['unit_price']}</h5> <!-- <p>{{product.description}}</p> -->

						</a>
					</div>

					<div class="col-8 col-lg-8 col-md-8 mb-2" style="background: white">
						<a ng-href="${contextRoot}/show/${map['id']}/product"
							style="text-decoration: none;" id="a_${map['name']}">

							<div class="card h-100" style="border: none;">
								<div class="card-body">
									<h3 class="productname">${map['name']}</h3>
									<div class="caption">
										<h5 class="pull-right productprice">
											${map['description']}</h5>
										<!-- <p>{{product.description}}</p> -->
									</div>
								</div>
							</div>
						</a>
					</div>

				</c:forEach>
			</div>

			<%@include file="/WEB-INF/views/shared/pagination.jsp"%>
		</div>

	</div>

</div>

