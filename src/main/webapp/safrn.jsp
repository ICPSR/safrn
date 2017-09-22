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

	
</head>
<body>

	<div class="container-fluid row">
		<div class="pull-left">
			<img src="./resources/images/ICPSR_logo_transparent.gif" alt="ICPSR Icon" width="256" height="256"></img>
		</div>
		<div class="pull-right">
			<img src="./resources/images/StealthLogo.png" alt="Stealth Icon" width="256" height="256"></img>
		</div>
	</div>

<div id="safrn"></div>
<script type="text/javascript">
 ReactDOM.render(React.createElement(Safrn), document.getElementById('safrn'));
</script>
</body>
</html>
