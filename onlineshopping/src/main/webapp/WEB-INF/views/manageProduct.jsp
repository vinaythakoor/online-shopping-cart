<%@taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>

<div class="container">

	<c:if test="${not empty message}">
		<div class="row">
			<div class="col-12 offset-md-2 col-md-8">
				<div class="alert alert-danger alert-dismissible">${message}</div>
			</div>
		</div>
	</c:if>

	<div class="row">

		<div class="offset-md-2 col-md-8">

			<div class="card">

				<div class="card-header">

					<h4>Product Management</h4>

				</div>

				<div class="card-body">

					<sf:form class="" modelAttribute="product"
						action="${contextRoot}/manage/product" method="POST"
						enctype="multipart/form-data">

						<div class="form-group row">
							<label for="name" class="col-sm-4 col-form-label">Name</label>

							<div class="col-md-8">
								<sf:input type="text" path="name" class="form-control"
									placeholder="Product Name" />
								<sf:errors path="name" cssClass="help-block redError" element="em" />
							</div>
						</div>

						<div class="form-group row">
							<label for="brand" class="col-sm-4 col-form-label">Brand</label>
							<div class="col-md-8">
								<sf:input type="text" path="brand" class="form-control"
									placeholder="Brand Name" />
								<sf:errors path="brand" cssClass="help-block redError" element="em" />
							</div>
						</div>

						<div class="row form-group">
							<label for="description" class="col-sm-4 col-form-label">Description</label>
							<div class="col-md-8">
								<sf:textarea path="description" class="form-control"
									placeholder="Enter your description here!" />
								<sf:errors path="description" cssClass="help-block redError" element="em" />
							</div>
						</div>
					

						<div class="form-group row">
							<label for="unitPrice" class="col-sm-4 col-form-label">Unit
								Price</label>
							<div class="col-md-8">
								<sf:input type="number" path="unitPrice" class="form-control"
									placeholder="Enter Unit Price" />
								<sf:errors path="unitPrice" cssClass="help-block redError" element="em" />
							</div>
						</div>

						<div class="row form-group">
							<label for="Quantity" class="col-sm-4 col-form-label">Quantity</label>
							<div class="col-md-8">
								<sf:input type="number" path="quantity" class="form-control"
									placeholder="Enter Quantity" />
								<sf:errors path="quantity" cssClass="help-block redError" element="em" />
							</div>
						</div>


						<div class="form-group row">
							<label for="file" class="col-sm-4 col-form-label">Upload
								a file</label>
							<div class="col-md-8">
								<sf:input type="file" path="file" class="form-control-file" />
								<sf:errors path="file" cssClass="help-block redError" element="em" />
							</div>
						</div>
  

						<div class="form-group row">
							<label for="category" class="col-sm-4 col-form-label">Category</label>
							<div class="col-md-8">
								<sf:select path="categoryId" items="${categories}"
									itemLabel="name" itemValue="id" class="form-control" />

								<div class="text-right">
									<br />
									<sf:hidden path="id" />
									<sf:hidden path="code" />
									<sf:hidden path="supplierId" />
									<sf:hidden path="active" />
									<button type="button" class="btn btn-warning btn-xs"
										data-toggle="modal" data-target="#myCategoryModal">Add
										New Category</button>
								</div>
							</div>

						</div>



						<div class="form-group row">

							<div class="offset-md-4 col-md-4">

								<input type="submit" name="submit" value="Save"
									class="btn btn-primary" />

							</div>
						</div>

					</sf:form>

				</div>

			</div>

		</div>

	</div>

	<!-- Modal -->
	<div class="modal fade" id="myCategoryModal" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Add New Category</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<sf:form id="categoryForm" class="form-horizontal"
						modelAttribute="category" action="${contextRoot}/manage/category"
						method="POST">

						<div class="form-group row">
							<label for="category_name" class="col-sm-4 col-form-label">Category
								Name</label>
							<div class="col-md-8 validate">
								<sf:input type="text" path="name" class="form-control"
									placeholder="Category Name" />
							</div>
						</div>

						<div class="form-group row">
							<label for="description" class="col-sm-4 col-form-label">Description</label>
							<div class="col-md-8 validate">
								<sf:textarea path="description" class="form-control"
									placeholder="Enter category description here!" />
							</div>
						</div>


						<div class="form-group row">
							<div class="col-sm-4 col-form-label">
								<input type="submit" name="submit" value="Save"
									class="btn btn-primary" />
							</div>
						</div>
					</sf:form>
				</div>
			</div>
		</div>
	</div>

    <hr />
	<h1>Available Products</h1>
	<hr />

	<div class="row">
		<div class='col-12'>
			<div class="table-responsive">
				<table id="productsTable" class="table table-striped table-bordered">

					<thead>
						<tr>
							<th>Id</th>
							<th>&#160;</th>
							<th>Name</th>
							<th>Brand</th>
							<th>Qty. Avail</th>
							<th>Unit Price</th>
							<th>Activate</th>
							<th>Edit</th>
						</tr>
					</thead>

					<tfoot>
						<tr>
							<th>Id</th>
							<th>&#160;</th>
							<th>Name</th>
							<th>Brand</th>
							<th>Qty. Avail</th>
							<th>Unit Price</th>
							<th>Activate</th>
							<th>Edit</th>
						</tr>
					</tfoot>


				</table>
			</div>

		</div>


	</div>
 
</div>