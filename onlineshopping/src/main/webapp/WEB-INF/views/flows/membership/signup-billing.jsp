<%@include file="../flows-shared/header.jsp" %>
<%@taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>			
	<div class="container">
		 
		<div class="row">
			
			<div class="col-md-6 offset-md-3">
				
				<div class="card">
				
					<div class="card-header">
						<h4>Sign Up - Address</h4>
					</div>
					
					<div class="card-body">
										
						<sf:form
							method="POST"
							modelAttribute="billing"
							class="form-horizontal"
							id="billingForm"
						>
						 	
							<div class="form-group row">
								<label class="col-form-label col-md-4" for="addressLineOne">Address Line One</label>
								<div class="col-md-8">
									<sf:input type="text" path="addressLineOne" class="form-control"
										placeholder="Enter Address Line One" />
									<sf:errors path="addressLineOne" cssClass="help-block redError" element="em"/> 
								</div>
							</div>

							<div class="form-group row">
								<label class="col-form-label col-md-4" for="addressLineTwo">Address Line Two</label>
								<div class="col-md-8">
									<sf:input type="text" path="addressLineTwo" class="form-control"
										placeholder="Enter Address Line Two" />
									<sf:errors path="addressLineTwo" cssClass="help-block redError" element="em"/> 
								</div>
							</div>

							<div class="form-group row">
								<label class="col-form-label col-md-4" for="city">City</label>
								<div class="col-md-8">
									<sf:input type="text" path="city" class="form-control"
										placeholder="Enter City Name" />
									<sf:errors path="city" cssClass="help-block redError" element="em"/> 
								</div>
							</div>
							
							<div class="form-group row">
								<label class="col-form-label col-md-4" for="postalCode">Postal Code</label>
								<div class="col-md-8">
									<sf:input type="text" path="postalCode" class="form-control"
										placeholder="XXXXXX" />
									<sf:errors path="postalCode" cssClass="help-block redError" element="em"/> 
								</div>
							</div>							
						
							<div class="form-group row">
								<label class="control-label col-md-4" for="state">State</label>
								<div class="col-md-8">
									<sf:input type="text" path="state" class="form-control"
										placeholder="Enter State Name" />
									<sf:errors path="state" cssClass="help-block redError" element="em"/> 
								</div>
							</div>

							<div class="form-group row">
								<label class="col-form-label col-md-4" for="country">Country</label>
								<div class="col-md-8">
									<sf:input type="text" path="country" class="form-control"
										placeholder="Enter Country Name" />
									<sf:errors path="country" cssClass="help-block redError" element="em"/> 
								</div>
							</div>
							
							
							<div class="form-group row">
								<div class="col-form-label col-md-4">
									<button type="submit" name="_eventId_personal" class="btn btn-primary">
										<span class="fas fa-chevron-left"></span> Back - Personal
									</button>								
									<button type="submit" name="_eventId_confirm" class="btn btn-primary">
										Next - Confirm<span class="fas fa-chevron-right"></span>
									</button>																	 
								</div>
							</div>
						
						
						</sf:form>					
					
					
					</div>
				
				
				</div>
			
			
			</div>
		
		
		</div>
		
		
	</div>

<%@include file="../flows-shared/footer.jsp" %>			
