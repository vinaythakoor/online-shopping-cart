<!-- DataTable Bootstrap Script -->
<script src="${js}/angular.js"></script>
<!-- DataTable Bootstrap Script -->
<script src="${js}/productsController.js"></script>


<div class="container-fluid" ng-app="ShoppingApp"
	ng-controller="ProductController as pCtrl">

	<div class="row mt-2" ng-init="pCtrl.fetchProducts()">

		<%-- <c:forEach var="map" items="${contactsList}">
			<tr>
				<td><c:out value="${map['first_Name']}" />
				<td><c:out value="${map['last_Name']}" />
			</tr>
		</c:forEach> --%>

		<c:forEach var="map" items="${searchResult}">
			
			<div class="col-2 col-sm-2 col-md-2 col-lg-2">
				<div class="card h-100" style="border: none;">
					<img ng-src="${images}/${map['code']}.jpg" alt="${product1.name}"
						class="card-img-top mt-2">
					<div class="card-body text-center">
						<div class="caption">
							<h5 class="pull-right productprice">&#8377;
								${map['unit_price']}</h5>
							<!-- <p>{{product.description}}</p> -->
						</div>
					</div>
				</div>
			</div>

			<div class="col-3 col-lg-3 col-md-3 mb-4" style="background: white">
				<a ng-href="${contextRoot}/show/${map['id']}/product"
					style="text-decoration: none;" id="a_${map['name']}">
					<div class="card h-100" style="border: none;">
						<img ng-src="${images}/${map['code']}.jpg" alt="${product1.name}"
							class="card-img-top mt-2">
						<div class="card-body text-center">
							<div class="caption">
								<h5 class="pull-right productprice">&#8377;
									${map['unit_price']}</h5>
								<!-- <p>{{product.description}}</p> -->
							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="col-5 col-lg-5 col-md-5 mb-4" style="background: white">
				<a ng-href="${contextRoot}/show/${map['id']}/product"
					style="text-decoration: none;" id="a_${map['name']}">

					<div class="card h-100" style="border: none;">
						<div class="card-body">
							<h3 class="productname">${map['name']}</h3>
							<div class="caption">
								<h5 class="pull-right productprice">&#8377;
									${map['description']}</h5>
								<!-- <p>{{product.description}}</p> -->
							</div>
						</div>
					</div>
				</a>
 			</div>

			<div class="col-2 col-sm-2 col-md-2 col-lg-2">
				<div class="card h-100" style="border: none;">
					<img ng-src="${images}/${map['code']}.jpg" alt="${product1.name}"
						class="card-img-top mt-2">
					<div class="card-body text-center">
						<div class="caption">
							<h5 class="pull-right productprice">&#8377;
								${map['unit_price']}</h5>
							<!-- <p>{{product.description}}</p> -->
						</div>
					</div>
				</div>
			</div>

		</c:forEach>
	</div>
</div>



