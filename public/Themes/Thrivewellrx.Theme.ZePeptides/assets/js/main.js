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

	$("#user-menu-btn").click(function () {
		$("#user-dropdown").toggleClass("show");
	});

	// Close dropdown when clicking outside
	// Close dropdown when clicking outside
	$(document).on("click", function (e) {
		if (!$(e.target).closest("#user-menu-btn").length && !$(e.target).closest("#user-dropdown").length) {
			$("#user-dropdown").removeClass("show");
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

	// Get Started Button Handler
	$("#browseProducts").on("click", function () {
		if (window.location.pathname === "/") {
			// On home page - scroll to product section
			$("html, body").animate(
				{
					scrollTop: $(".product").offset().top - 75,
				},
				"smooth"
			);
		} else {
			// On other pages - redirect to home and scroll to product section
			window.location.href = "/#products";
		}
	});
	$("#getStartedBtn").on("click", function () {
		if (window.location.pathname === "/") {
			// On home page - scroll to product section
			$("html, body").animate(
				{
					scrollTop: $(".product").offset().top - 75,
				},
				"smooth"
			);
		} else {
			// On other pages - redirect to home and scroll to product section
			window.location.href = "/#products";
		}
	});

	// If coming from anchor link (#products) on non-home pages, redirect and scroll
	$(window).on("load", function () {
		if (window.location.hash === "#products" && window.location.pathname !== "/") {
			window.location.pathname = "/";
		} else if (window.location.hash === "#products" && window.location.pathname === "/") {
			setTimeout(function () {
				$("html, body").animate(
					{
						scrollTop: $(".product").offset().top - 75,
					},
					"smooth"
				);
			}, 100);
		}
	});

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

	// Product page Js
	$("#readMore").on("click", function () {
		$(this).parents(".product-hero__details").toggleClass("show");
		$(this).text("Read Less");
	});
});
