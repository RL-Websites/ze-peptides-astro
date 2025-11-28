$(document).ready(function () {
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	$(".hamburger-menu").click(function () {
		$(".site__menu__list").toggleClass("show-menu");
		$(".site__header").toggleClass("menu-open");
		$("body").toggleClass("header-open");

		var icon = $(this).find("i");
		if (icon.hasClass("icon-hamburger-menu")) {
			icon.removeClass("icon-hamburger-menu").addClass("icon-cross");
		} else {
			icon.removeClass("icon-cross").addClass("icon-hamburger-menu");
		}
	});

	function updateHeader() {
		const header = document.querySelector(".site__header");
		if (!header) return;

		const logo = header.querySelector(".site__logo--img");
		if (!logo) return;

		const scrollTop = window.scrollY || document.documentElement.scrollTop;

		if (scrollTop >= 50) {
			header.classList.add("sticky");
			if (logo.dataset.logoSticky) logo.src = logo.dataset.logoSticky;
		} else {
			header.classList.remove("sticky");
			if (logo.dataset.logoDefault) logo.src = logo.dataset.logoDefault;
		}
	}

	// Run on page load
	updateHeader();

	// Run on scroll
	$(window).on("scroll", function () {
		updateHeader();
	});

	//Scroll section
	$(".scrollToTop").on("click", function () {
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			"slow"
		);
	});

	$("#liveToastBtn").on("click", function () {
		var toastEl = $("#liveToast");
		var toast = new bootstrap.Toast(toastEl[0]);
		toast.show();
	});
	// Header Menu JS Code end

	// Header Sticky end

	// 	$("#couponModal")
	// 		.on("show.bs.modal", function () {
	// 			const modalDialog = $(this).find(".modal-dialog");
	// 			modalDialog.addClass("animate-bounceIn");
	// 		})
	// 		.on("hidden.bs.modal", function () {
	// 			const modalDialog = $(this).find(".modal-dialog");
	// 			modalDialog.removeClass("animate-bounceIn");
	// 		});
});
