<!-- DataTable Bootstrap Script -->
<script src="${js}/angular.js"></script>

<!-- DataTable Bootstrap Script -->
<script src="${js}/productsController.js"></script>

<div class="container-fluid" ng-app="ShoppingApp" ng-controller="ProductController as pCtrl">

	<div class="row" ng-init="pCtrl.fetchProducts()">

		<%-- <div class="col-lg-2">
			<%@include file="./shared/sidebar.jsp"%>
	</div> --%>

	<div class="col-lg-12">

		<div class="row mb-4">
			<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
				<ol class="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
				</ol>

				<div class="carousel-inner" role="listbox">

					<div class="carousel-item active">
						<img class="d-block img-fluid" src="${images}/iphone.jpg" alt="">
					</div>
					<div class="carousel-item">
						<img class="d-block img-fluid" src="${images}/mitv.jpg" alt="">
					</div>
					<div class="carousel-item">
						<img class="d-block img-fluid" src="${images}/sony.jpg" alt="">
					</div>
					<div class="carousel-item">
						<img class="d-block img-fluid" src="${images}/nokia.jpg" alt="">
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"> <span class="carousel-control-prev-icon"
					 aria-hidden="true"></span> <span class="sr-only">Previous</span>
				</a> <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"> <span
					 class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span>
				</a>
			</div>
		</div>

		<!--//////////  row start //////////////-->
		<div class="row mt-5 mx-auto bg-white rounded">
			<div class="col-2 mt-2 bg-white rounded" style="display: inline;">
				<a href="${contextRoot}/view/category/1/products" style="text-decoration: none;">
					<h5 class="categoryname mt-2 ml-2">
						Laptops&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-double-right"></i>
					</h5>
				</a>
			</div>
		</div>

		<div class="row mx-auto" style="background-color: white;">
			<c:forEach items="${viewproducts1}" var="product1" begin="0" end="11" varStatus="loop">
				<div class="col-lg-2 col-md-6 mb-4">
					<a ng-href="${contextRoot}/show/${product1.id}/product" style="text-decoration: none;" id="a_${product1.name}">
						<div class="card h-100" style="border: none;">
							<img ng-src="${images}/${product1.code}.jpg" alt="${product1.name}" class="card-img-top zoom mt-2">
							<div class="card-body text-center">
								<h5 class="titlename text-truncate">${product1.name}</h5>
								<div class="caption">
									<h5 class="pull-right productprice">&#8377;
										${product1.unitPrice}</h5>
									<!-- <p>{{product.description}}</p> -->
								</div>
							</div>
						</div>
					</a>
				</div>
			</c:forEach>
		</div>


		<%-- <div class="row mx-auto mb-5" style="background-color: white;">
				<div class="col-lg-2 col-md-4 col-sm-6 col-12" style="height: 270px;">
					<div class="card">
						<img src="${images}/Apple iPhone 6 32GB .jpg"  class="img-fluid" alt="BeatsX">
			 		</div>
				</div>
			</div> --%>
		<!--//////////  row end //////////////-->

		<!--//////////  row start //////////////-->
		<div class="row mt-5 mx-auto bg-white rounded">
			<div class="col-2 mt-2 bg-white rounded" style="display: inline;">
				<a href="${contextRoot}/view/category/2/products" style="text-decoration: none;">
					<h3 class="categoryname mt-2 ml-2">
						Televisions&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-double-right doubleangle"></i>
					</h3>
				</a>
			</div>
		</div>

		<div class="row mx-auto" style="background-color: white;">
			<c:forEach items="${viewproducts2}" var="product2" begin="0" end="11" varStatus="loop">
				<div class="col-lg-2 col-md-6 mb-4 hover01">
					<a ng-href="${contextRoot}/show/${product2.id}/product" style="text-decoration: none;" id="a_${product2.name}">
						<div class="card h-100 " style="border: none;">
							<img ng-src="${images}/${product2.code}.jpg" alt="${product2.name}" class="zoom card-img-top mt-2" style="height: 120px">
							<div class="card-body text-center">
								<h5 class="titlename text-truncate">${product2.name}</h5>
								<div class="caption">
									<h5 class="pull-right titleprice">&#8377;
										${product2.unitPrice}</h5>
									<!-- <p>{{product.description}}</p> -->
								</div>
							</div>
						</div>
					</a>
				</div>
			</c:forEach>
		</div>

		<!--//////////  row end //////////////-->

		<!--//////////  row start //////////////-->
		<div class="row mt-5 mx-auto bg-white rounded">
			<div class="col-2 mt-2 bg-white rounded" style="display: inline;">
				<a href="${contextRoot}/view/category/3/products" style="text-decoration: none;">
					<h4 class="categoryname mt-2 ml-2">
						Mobiles&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-double-right doubleangle"></i>
					</h4>
				</a>
			</div>
		</div>

		<div class="row mx-auto" style="background-color: white;">
			<c:forEach items="${viewproducts3}" var="product3" begin="0" end="11" varStatus="loop">
				<div class="col-lg-2 col-md-6 mb-4">
					<a ng-href="${contextRoot}/show/${product3.id}/product" style="text-decoration: none;" id="a_${product3.name}">
						<div class="card h-100" style="border: none; height: 400px">
							<img ng-src="${images}/${product3.code}.jpg" alt="${product3.name}" class="card-img-top zoom mt-2" style="height: 170px">
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
		</div>

		<div class="col-sm-4" ng-repeat="product in pCtrl.searchProducts">
			<div class="thumbnail">
				<img ng-src="${images}/{{product.code}}.jpg" alt="{{product.name}}" class="landingImg">
				<h5>{{product.name}}</h5>
				<hr />
				<div class="caption">
					<h4 class="pull-right">&#8377; {{product.unitPrice}}</h4>
					<p>{{product.description}}</p>
					<a ng-href="${contextRoot}/show/{{product.id}}/product" class="btn btn-primary pull-right">View</a>
				</div>
			</div>

		</div>
		<!--//////////  row end //////////////-->

	</div>


</div>

</div>
<!-- /.container -->

<%-- 		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<c:url value="/list" var="prev">
					<c:param name="page" value="${page-1}" />
				</c:url>
				<c:if test="${page > 1}">
					<li class="page-item"><a class="page-link"
						href="<c:out value="${prev}" />">Prev</a></li>
				</c:if>

				<c:forEach begin="1" end="${maxPages}" step="1" varStatus="i">
					<c:choose>
						<c:when test="${page == i.index}">

							<li class="page-item"><span class="page-link"
								style="background-color: blue">${i.index}</span></li>
						</c:when>
						<c:otherwise>
							<c:url value="/list" var="url">
								<c:param name="page" value="${i.index}" />
							</c:url>
							<li class="page-item"><a class="page-link"
								href='<c:out value="${url}" />'>${i.index}</a></li>
						</c:otherwise>
					</c:choose>
				</c:forEach>
				<c:url value="/list" var="next">
					<c:param name="page" value="${page + 1}" />
				</c:url>
				<c:if test="${page + 1 <= maxPages}">
					<li class="page-item"><a class="page-link"
						href='<c:out value="${next}" />'>Next</a></li>
				</c:if>
			</ul>
		</nav>
 --%>
 
