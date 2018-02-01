<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>SAFRN home</title>
<link href="./resources/scripts/jquery-ui/jquery-ui.css" type="text/css" rel="stylesheet" media="screen" />
	<link href="./resources/scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<script src="./resources/scripts/jquery-3.2.1.js"></script>
	<script src="./resources/scripts/jquery-ui/jquery-ui.js"></script>
	<script src="./resources/scripts/bootstrap/js/bootstrap.min.js"></script>
	<script src="./resources/scripts/react-0.14.7/react.js"></script>
	<script src="./resources/scripts/react-0.14.7/react-dom.js"></script>
	<script src="./resources/scripts/app/Safrn.js"></script>
	<script src="./resources/scripts/app/SafrnResponse.js"></script>
	<script src="./resources/scripts/app/CreateTable.js"></script>
	<script src="./resources/scripts/app/MultipleTables.js"></script>
	<script src="./resources/scripts/app/ErrorMessage.js"></script>
	<script src="./resources/scripts/app/datatable.js"></script>
	<script src="./resources/scripts/Datatables/datatables.min.js"></script>
	<link href="./resources/scripts/Datatables/datatables.min.css" rel="stylesheet" />
	<script src="<c:url value="./resources/scripts/Datatables/Buttons/js/buttons.jqueryui.min.js" />"></script>
<script src="<c:url value="./resources/scripts/Datatables/Buttons/js/buttons.html5.min.js" />"></script>
<script src="<c:url value="./resources/scripts/Datatables/Buttons/js/buttons.colVis.min.js" />"></script>
<script src="<c:url value="./resources/scripts/Datatables/Buttons/js/buttons.print.min.js" />"></script>

	
</head>
<body>
<div id="safrn"></div>
<script type="text/javascript">
var ip = "<%= application.getInitParameter("ip") %>";
var port = "<%= application.getInitParameter("port") %>";
 ReactDOM.render(React.createElement(Safrn, {ip:ip, port:port}), document.getElementById('safrn'));
</script>
</body>
</html>
