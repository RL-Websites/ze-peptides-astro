$(document).ready(function () {
	$("#datetimepicker3").datetimepicker({
		format: "MM -- DD -- YYYY",
		widgetPositioning: {
			vertical: "top",
		},
	});

	$("#datetimepicker3").on("dp.change", function (e) {
		console.log(e.date.format("MM, DD, YYYY"));
		const month = e.date.format("MM");
		const date = e.date.format("DD");
		const year = e.date.format("YYYY");
		$("#datetimepicker3 #month").text(month);
		$("#datetimepicker3 #date").text(date);
		$("#datetimepicker3 #year").text(year);
	});

	$("#timepicker3").datetimepicker({
		format: "LT",
		widgetPositioning: {
			vertical: "top",
		},
	});

	$("#timepicker3").on("dp.change", function (e) {
		const hour = e.date.format("hh");
		const minute = e.date.format("mm");
		$("#timepicker3 #hour").text(hour);
		$("#timepicker3 #minute").text(minute);
	});

	$("#time-picker-1").datetimepicker({
		format: "LT",
		widgetPositioning: {
			vertical: "top",
		},
	});

	$("#time-picker-1").on("dp.change", function (e) {
		const hour = e.date.format("hh");
		const minute = e.date.format("mm");
		$("#time-picker-1 #hour").text(hour);
		$("#time-picker-1 #minute").text(minute);
	});
});
