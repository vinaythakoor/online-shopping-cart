<!-- DataTable Bootstrap Script -->
<script src="${js}/angular.js"></script>

<!-- DataTable Bootstrap Script -->
<script src="${js}/productsController.js"></script>

<div class="container-fluid" ng-app="ShoppingApp"
	ng-controller="ProductController as pCtrl">

	<div class="row" ng-init="pCtrl.fetchProducts()">

		<%-- 		<c:forEach items="${viewproducts3}" var="product3" begin="0" end="11"
			varStatus="loop">
			<div class="col-lg-2 col-md-6 mb-4">
				<a ng-href="${contextRoot}/show/${product3.id}/product"
					style="text-decoration: none;" id="a_${product3.name}">
					<div class="card h-100" style="border: none; height: 400px">
						<img ng-src="${images}/${product3.code}.jpg"
							alt="${product3.name}" class="card-img-top zoom mt-2"
							style="height: 170px">
						<div class="card-body text-center">
							<h5 class="titlename text-truncate">${product3.name}</h5>
							<div class="caption">
								<h5 class="pull-right productprice">&#8377;
									${product3.unitPrice}</h5>
								<!-- <p>{{product.description}}</p> -->
							</div>
						</div>
					</div>
				</a>
			</div>
		</c:forEach>
	</div> --%>

		<c:forEach items="${brandlist}" var="brandlist" varStatus="loop">
			<div class="col-lg-2 col-md-6 mb-4">
				<h5 class="titlename text-truncate">${brandlist.name}</h5>
			</div>
		</c:forEach>
  	
		<!--//////////  row end //////////////-->

	</div>
	
		<%@include file="/WEB-INF/views/shared/pagination.jsp" %> 


   <div id="content"></div>
  	
	<!-- /.container -->
 