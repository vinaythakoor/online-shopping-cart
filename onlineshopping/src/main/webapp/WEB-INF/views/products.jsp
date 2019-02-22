<div class="container-fluid">

	<div class="row">
		<div class="col-md-2">
			<%@include file="./shared/sidebar.jsp"%>
		</div>

		<!-- to display the actual products -->
		<div class="col-md-10">

			<!-- Added breadcrumb component -->
			<div class="row">

				<div class="col-lg-12">

					<c:if test="${userClickAllProducts == true}">

						<script>
							window.categoryId = '';
						</script>

						<nav aria-label="breadcrumb">
							<ol class="breadcrumb">
								<li class="breadcrumb-item" aria-current="page"><a
									href="${contextRoot}/home">Home</a></li>
								<li class="breadcrumb-item active" aria-current="page">All
									Products</li>
							</ol>
						</nav>
					</c:if>


					<c:if test="${userClickCategoryProducts == true}">
						<script>
							window.categoryId = '${category.id}';
						</script>
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb">
								<li class="breadcrumb-item" aria-current="page"><a
									href="${contextRoot}/home">Home</a></li>
								<li class="breadcrumb-item active" aria-current="page">Category</li>
								<li class="breadcrumb-item active" aria-current="page">${category.name}</li>
							</ol>
						</nav>
					</c:if>
				</div>
			</div>

			<div class="row" style="background-color: white;">

				<c:forEach items="${productlist}" var="product1" begin="0" end="5"
					varStatus="loop">
					<div class="col-lg-2 col-md-6 mb-4">
						<a href="${contextRoot}/show/${product1.id}/product"
							style="text-decoration: none;" id="a_${product1.name}">
							<div class="card h-100" style="border: none;">
								<div class="">

									<img src="${images}/${product1.code}.jpg" class="img img-fluid" />

								</div>
								<div class="card-body text-center">
									<h5 class="productname">${product1.name}</h5>
								</div>
								<div class="card-body text-center">
									<h5 class="productname">${product1.brand}</h5>
								</div>

							</div>
						</a>

					</div>
				</c:forEach>
			</div>


		</div>

	</div>
</div>