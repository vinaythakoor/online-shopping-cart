
<div class="container">

	<!-- Breadcrumb -->
	<div class="row">

		<div class="col-12">
			<nav aria-label="breadcrumb" >
				<ol class="breadcrumb" style="background-color: white">
					<li class="breadcrumb-item"><a href="${contextRoot}/home" style="text-decoration:none">Home</a></li>
					<li class="breadcrumb-item"><a
						href="${contextRoot}/show/all/products" style="text-decoration:none">Products</a></li>
					<li class="breadcrumb-item active">${product.name}</li>
				</ol>
			</nav>

		</div>


	</div>


	<div class="row" >

		<!-- Display the product image -->
		<div class="col-12 col-sm-4">

			<img src="${images}/${product.code}.jpg" class=""
				style= " margin: auto;" />

			<div class="text-center">
				<security:authorize access="isAnonymous() or hasAuthority('USER')">

					<c:choose>

						<c:when test="${product.quantity < 1}">

							<a href="javascript:void(0)" class="btn btn-success disabled mt-4"><strike>
									<span class="fas fa-cart-plus"></span> Add to Cart
							</strike></a>

						</c:when>
						<c:otherwise>

							<a href="${contextRoot}/cart/add/${product.id}/product"
								class="btn btn-success mt-4"> <span class="fas fa-cart-plus"></span>
								Add to Cart
							</a>
						</c:otherwise>

					</c:choose>
				</security:authorize>
 
				<security:authorize access="hasAuthority('ADMIN')">
					<a href="${contextRoot}/manage/${product.id}/product"
						class="btn btn-success"> <span class="far fa-edit"></span>
						Edit
					</a>
				</security:authorize>
				<a href="${contextRoot}/show/all/products"
					class="btn btn-warning mt-4"> Continue Shopping</a>
			</div>
		</div>


		<!-- Display the product description -->
		<div class="col-12 col-sm-8">

			<h3 class="ml-4">${product.name}</h3>
			<hr />

			<h4 class="ml-4">
				Price: <strong> &#8377; ${product.unitPrice} /-</strong>
			</h4>
			<hr />

			<c:choose>

				<c:when test="${product.quantity < 1}">

					<h6 class="mt-3 ml-4">
						Qty. Available: <span style="color: red">Out of Stock!</span>
					</h6>

				</c:when>
				<c:otherwise>

					<h6 class="mt-3 ml-4">Qty. Available:
						${product.quantity}</h6>
					<hr>
				</c:otherwise>

			</c:choose>

			<p class="mt-3 ml-4">${product.description}</p>
			<hr />

		</div>
	</div>
</div>