<!-- DataTable Bootstrap Script -->
<script src="${js}/angular.js"></script>
<!-- DataTable Bootstrap Script -->
<script src="${js}/productsController.js"></script>


<div class="container-fluid" ng-app="ShoppingApp"
	ng-controller="ProductController as pCtrl">

	<div class="row mt-3 mr-1 no-gutter" ng-init="pCtrl.fetchProducts()">

		<div class="col-6 col-sm-4 col-md-3 col-lg-3 mt-3">

			<%-- <c:forEach items="${categories}" var="category">
				<a href="${contextRoot}/show/category/${category.id}/products"
					class="list-group-item" id="a_${category.name}">${category.name}</a>
			</c:forEach> --%>

			<div class="card h-100"
				style="background: white; height: 800px; border: none;">

				<h4 class=" ml-2 mt-2">Filters</h4>
				<hr>
				<h5 class=" ml-2 mt-2">Price Range</h5>
				<hr>

				<p id="demo"></p>

				<form class="form-group" action="" id="sliderForm">

					<div class="row card-body text-center">
						<div class="col-12 col-sm-12 col-md-12 col-lg-12">
							Price : <span id="spanOutput"></span>
						</div>

						<div class="col-12 col-sm-12 col-md-12 col-lg-12 mt-3 mb-3 ui">
							<div class="form-control uislide" id="slider"></div>
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
										class="custom-control-label brandname" for="${brand}">${brand}</label>
								</div>
							</c:forEach>

							<pre id="whereToPrint"></pre>
						</div>
					</div>
					<hr>
				</form>
			</div>
		</div>

		<div class="col-4 col-sm-4 col-md-3 col-lg-9 mt-3">

			<div class="row mt-5 mx-auto bg-white rounded">
				<h4 class="titlename mt-2 ml-2">
					${title}&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-double-right"></i>
				</h4>
			</div>

			<div class="row mt-3 mr-1 no-gutters" style="">

				<c:forEach var="map" items="${viewproducts}">

					<div class="col-4 col-lg-4 col-md-4 border-bottom" style="background: white">
						<a ng-href="${contextRoot}/show/${map['id']}/product"
							style="text-decoration: none;" id="a_${map['name']}">
							<div class="card h-100" style="border: none;">
								<img ng-src="${images}/${map['code']}.jpg"
									alt="${product1.name}" class="img-fluid mt-4"
									style="margin: auto">
								<div class="card-body text-center">
									<div class="caption">
										<h5 class="pull-right productprice font-weight-bold">&#8377;
											${map['unit_price']}</h5>
										<!-- <p>{{product.description}}</p> -->
									</div>
								</div>
							</div>
						</a>
						 
					</div>

					<div class="col-8 col-lg-8 col-md-8 border-bottom" style="background: white">
						<a ng-href="${contextRoot}/show/${map['id']}/product"
							style="text-decoration: none;" id="a_${map['name']}">

							<div class="card h-100" style="border: none;">
								<div class="card-body">
									<h5 class="productname">${map['name']}</h5>
									<div class="caption">
										<h5 class="pull-right productprice ml-2">
											${map['description']}</h5>
										<!-- <p>{{product.description}}</p> -->
									</div>
								</div>
							</div>
						</a>
						<hr>
					</div>
				</c:forEach>
			</div>
		</div>
	</div>

</div>

