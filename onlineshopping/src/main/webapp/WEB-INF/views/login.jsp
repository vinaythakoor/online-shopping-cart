<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%-- <%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<spring:url var="css" value="/assets/css" />
<spring:url var="js" value="/assets/js" />
<spring:url var="images" value="/assets/images" />
 --%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextRoot" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Online Shopping - ${title}</title>

<!-- Bootstrap Core CSS -->
<link href="assets/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Readable Theme -->
<link href="assets/css/bootstrap-flatly-theme.css" rel="stylesheet">


<!-- Custom CSS -->
<link href="assets/css/myapp.css" rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<script>
	window.menu = '${title}';

	window.contextRoot = '${contextRoot}'
</script>
</head>

<body>

	<div class="wrapper">

		<!-- Navigation -->
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2" role="navigation">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<a class="navbar-brand" href="${contextRoot}/home">Online
						Shopping</a>
				</div>
			</div>
		</nav>

		<!-- Page Content -->

		<div class="content">

			<div class="container">

				<c:if test="${not empty message}">
					<div class="row">
						<div class="col-12 offset-md-2 col-md-8">
							<div class="alert alert-danger alert-dismissible">${message}</div>
						</div>
					</div>
				</c:if>

				<c:if test="${not empty logout}">
					<div class="row">
						<div class="col-12 offset-md-2 col-md-8">
							<div class="alert alert-success">${logout}</div>
						</div>
					</div>
				</c:if>

				<div class="row">

					<div class="offset-md-3 col-md-6">

						<div class="card">

							<div class="card-header">
								<h4>Login</h4>
							</div>

							<div class="card-body">
								<form action="${contextRoot}/login" method="POST"
									class="form-horizontal loginForm" id="loginAjaxForm">
									<div class="form-group row">
										<label for="email" class="col-form-label col-md-4">Email:
										</label>
										<div class="col-md-8">
											<input type="email" name="email" id="email"
												class="form-control"/>
										</div>
									</div>
									<div class="form-group row">
										<label for="password" class="col-form-label col-md-4">Password:
										</label>
										<div class="col-md-8">
											<input type="password" name="password" id="password"
												class="form-control" />
										</div>
									</div>
									<div class="form-group row">
										<div class="offset-md-4 col-md-8">
											<%-- <input type="hidden" name="${_csrf.parameterName}"
												value="${_csrf.token}" /> --%> <input type="submit"
												value="Login" class="btn btn-primary" />
										</div>
									</div> 
								</form>

							</div>
							<div class="card-footer">
								<div class="text-right">
									New User - <a href="${contextRoot}/membership">Register Here</a>
								</div>
							</div>

						</div>

					</div>

				</div>

			</div>


		</div>


		<!-- Footer comes here -->
		<%@include file="./shared/footer.jsp"%>

		<!-- jQuery -->
		<script src="assets/js/jquery.js"></script>

		<script src="assets/js/jquery.validate.js"></script>

		<!-- Bootstrap Core JavaScript -->
		<script src="assets/js/bootstrap.min.js"></script>

		<!-- Self coded javascript -->
		<script src="assets/js/myapp.js"></script>

	</div>

</body>

</html>