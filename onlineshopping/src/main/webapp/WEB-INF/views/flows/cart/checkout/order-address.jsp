<%@include file="../../flows-shared/header.jsp"%>
<%@taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<div class="container">

	<div class="row mt-5">

		<div class="col-md-4">
			<hr />
			<h3 class="font-weight-bold">Select Shipping Address</h3>
			<hr />

			<div class="row">
				<c:forEach items="${addresses}" var="address">
					<div class="col-12">
						<h5>${address.addressLineOne}</h5>
						<h5>${address.addressLineTwo}</h5>
						<h5>${address.city}-${address.postalCode}</h5>
						<h5>${address.state}-${address.country}</h5>
						<hr />
						<div class="text-center">
							<a
								href="${flowExecutionUrl}&_eventId_addressSelection&shippingId=${address.id}"
								class="btn btn-primary">Select</a>
						</div>
					</div>
				</c:forEach>
			</div>


		</div>

		<div class="col-md-8">


			<div class="card">

				<div class="card-header">
					<h3 class="font-weight-bold">Sign Up - Address</h3>
				</div>

				<div class="card-body">

					<sf:form method="POST" modelAttribute="shipping"
						class="form-horizontal" id="billingForm">


						<div class="form-group">
							<label class="control-label col-md-4" for="addressLineOne">Address
								Line One</label>
							<div class="col-md-8">
								<sf:input type="text" path="addressLineOne" class="form-control"
									placeholder="Enter Address Line One" />
								<sf:errors path="addressLineOne" cssClass="help-block"
									element="em" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-md-4" for="addressLineTwo">Address
								Line Two</label>
							<div class="col-md-8">
								<sf:input type="text" path="addressLineTwo" class="form-control"
									placeholder="Enter Address Line Two" />
								<sf:errors path="addressLineTwo" cssClass="help-block"
									element="em" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-md-4" for="city">City</label>
							<div class="col-md-8">
								<sf:input type="text" path="city" class="form-control"
									placeholder="Enter City Name" />
								<sf:errors path="city" cssClass="help-block" element="em" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-md-4" for="postalCode">Postal
								Code</label>
							<div class="col-md-8">
								<sf:input type="text" path="postalCode" class="form-control"
									placeholder="XXXXXX" />
								<sf:errors path="postalCode" cssClass="help-block" element="em" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-md-4" for="state">State</label>
							<div class="col-md-8">
								<sf:input type="text" path="state" class="form-control"
									placeholder="Enter State Name" />
								<sf:errors path="state" cssClass="help-block" element="em" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-md-4" for="country">Country</label>
							<div class="col-md-8">
								<sf:input type="text" path="country" class="form-control"
									placeholder="Enter Country Name" />
								<sf:errors path="country" cssClass="help-block" element="em" />
							</div>
						</div>


						<div class="form-group">
							<div class="col-md-offset-4 col-md-8">
								<button type="submit" name="_eventId_saveAddress"
									class="btn btn-primary">
									<span class="glyphicon glyphicon-plus"></span> Add Address
								</button>
							</div>
						</div>


					</sf:form>


				</div>


			</div>



		</div>


	</div>

 
</div>
<%@include file="../../flows-shared/footer.jsp"%>
