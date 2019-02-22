
<div class="row" id="paginrow">
	<div class="offset-lg-3"></div>
	<div class="col-lg-6 mx-auto" style="">
		<nav aria-label="Page navigation example" class="mx-auto">
			<ul class="pagination pagination justify-content-center mt-3">
				<c:if test="${page > 1}">
					<li class="page-item"><a class="page-link rounded"
						href="${urlvalue}&page=${page - 1}">Prev</a></li>
				</c:if>

				<c:forEach begin="${begin}" end="${end}" step="1" varStatus="i">
					<c:choose>
						<c:when test="${page == i.index}">

							<li class="page-item active"><span
								class="page-link rounded border border-secondary" style="">${i.index}</span></li>
						</c:when>
						<c:otherwise>
							<c:url value="/${urlvalue}" var="url">
								<c:param name="page" value="${i.index}" />
							</c:url>
							<li class="page-item"><a class="page-link rounded"
								href='${urlvalue}&page=${i.index}'>${i.index}</a></li>
						</c:otherwise>
					</c:choose>
				</c:forEach>

				<c:if test="${page + 1 <= maxPages}">
					<li class="page-item"><a class="page-link rounded"
						href='${urlvalue}&page=${page + 1}'>Next</a></li>
				</c:if>
			</ul>
		</nav>
	</div>
	<div class="offset-lg-3"></div>
</div>
