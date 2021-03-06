(function ($) {
	$.fn.kpicker = function () {
		var hour = [];
		$(this).each(function (k, v) {
			var rand = Math.floor(Math.random() * 999999) + 999;
			if (!$(v).attr("id")) $(v).attr("id", "timepicker_" + rand);
			if (!$(v).hasClass("timepicker")) $(v).addClass("timepicker");
			$(v).prop("readonly", "readonly");
		});
		$(document).on("click", function (e) {
			if ($(e.target).hasClass("kpicker_main") || $(e.target).parents(".kpicker_main").hasClass("kpicker_main")) {
				return;
			}
			$(".kpicker_main").remove();
			if ($(e.target).hasClass("timepicker")) {
				var width = $(e.target).outerWidth();
				var val = getTimepickiTime($(e.target));
				var pos = "left";
				if ($(e.target).attr("data-pos")) pos = $(e.target).attr("data-pos");
				var html = $("<div class='kpicker_main' data-target='" + $(e.target).attr('id') + "' style='width: " + width + "px'></div>");
				var rows = "";
				for (i = 1; i <= 12; i++) {
					var number = pad_with_zeroes(i, 2);
					if (i == 1) rows += '<div class="kpicker_row kpicker_hour">';
					if (i == 7) rows += '</div><div class="kpicker_row kpicker_hour">';
					var selected = "";
					if (number == val[0]) selected = "selected";
					rows += '<div class="kpicker_number ' + selected + '" data-value="' + number + '">' + number + '</div>';
					if (i == 12) rows += '</div>';
				}
				$(html).append(rows);
				var rows = "";
				for (i = 0; i <= 55; i = i += 5) {
					var number = pad_with_zeroes(i, 2);
					if (i === 00) rows += '<div class="kpicker_row kpicker_minutes d-none">';
					if (i === 30) rows += '</div><div class="kpicker_row kpicker_minutes d-none">';
					var selected = "";
					if (number == val[1]) selected = "selected";
					rows += '<div class="kpicker_number ' + selected + '" data-value="' + number + '">' + number + '</div>';
					if (i === 60) rows += '</div>';
				}
				$(html).append(rows);
				var selectedam = "";
				var selectedpm = "";
				if (val[2] == "AM") selectedam = "selected";
				if (val[2] == "PM") selectedpm = "selected";
				$(html).append('<div class="kpicker_row kpicker_mer d-none"><div class="kpicker_number ' + selectedam + '" data-value="AM">AM</div><div class="kpicker_number ' + selectedpm + '" data-value="PM">PM</div></div>');

				$("body").append(html);
				new Tether({
					element: html,
					target: e.target,
					attachment: 'top ' + pos,
					targetAttachment: 'bottom ' + pos
				});
			}
		});

		var hour = [];
		$(document).on("click", ".kpicker_hour .kpicker_number", function () {
			hour = [];
			$(".kpicker_hour").addClass("d-none");
			$(".kpicker_minutes").removeClass("d-none");
			hour.push($(this).attr("data-value"));
		});
		$(document).on("click", ".kpicker_minutes .kpicker_number", function () {
			$(".kpicker_minutes").addClass("d-none");
			$(".kpicker_mer").removeClass("d-none");
			hour.push($(this).attr("data-value"));
		});
		$(document).on("click", ".kpicker_mer .kpicker_number", function () {
			$(".kpicker_minutes").addClass("d-none");
			$(".kpicker_mer").removeClass("d-none");
			hour.push($(this).attr("data-value"));
			var target = $(this).parents(".kpicker_main").attr("data-target");
			$("#" + target).val(hour[0] + ":" + hour[1] + " " + hour[2]);
			$(".kpicker_main").remove();
			hour = [];
		});
		$(window).resize(function () {
			$(".kpicker_main").remove();
		});

		function getTimepickiTime(obj) {
			var TimeValue = obj.val();
			var trimmedTimeValue = TimeValue.split(' ');
			var resultSplit = trimmedTimeValue[0].split(':');
			resultSplit.push(trimmedTimeValue[1]);
			return resultSplit;
		};

		function pad_with_zeroes(number, length) {
			var my_string = '' + number;
			while (my_string.length < length) {
				my_string = '0' + my_string;
			}
			return my_string;
		}
	}
}(jQuery));