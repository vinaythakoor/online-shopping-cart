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

			<div class="row">

				<div class="col-12">

					<div class="table-responsive-lg">
						<table id="productListTable"
							class="table table-striped table-bordered">
							<thead>
								<tr>
									<th></th>
									<th scope="col">Name</th>
									<th scope="col">Brand</th>
									<th scope="col">Price</th>
									<th scope="col">Qty. Available</th>
									<th></th>
								</tr>
							</thead>
 
							<tfoot>

								<tr>
									<th></th>
									<th scope="col">Name</th>
									<th scope="col">Brand</th>
									<th scope="col">Price</th>
									<th scope="col">Qty. Available</th>
									<th></th>

								</tr>

							</tfoot>
						</table>
					</div>
				</div>
 			</div>
 
		</div>

	</div>
</div>