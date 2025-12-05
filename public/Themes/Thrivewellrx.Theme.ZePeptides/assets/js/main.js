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
		if (
			!$(e.target).closest("#user-menu-btn").length &&
			!$(e.target).closest("#user-dropdown").length
		) {
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
		if (
			window.location.hash === "#products" &&
			window.location.pathname !== "/"
		) {
			window.location.pathname = "/";
		} else if (
			window.location.hash === "#products" &&
			window.location.pathname === "/"
		) {
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
// how it works script
// This script will run on the client-side
const steps = document.querySelectorAll(".timeline-step[data-observed]");

// Function to remove active class from all steps
const deactivateAllSteps = () => {
	steps.forEach((step) => {
		const dot = step.querySelector(".timeline-dot");
		const stepNumber = step.querySelector(".step-number");
		const title = step.querySelector(".step-title");

		dot?.classList.remove("active");
		stepNumber?.classList.remove("purple");
		title?.classList.remove("active-title");
	});
};

// Function to activate a specific step
const activateStep = (step) => {
	const dot = step.querySelector(".timeline-dot");
	const stepNumber = step.querySelector(".step-number");
	const title = step.querySelector(".step-title");

	dot?.classList.add("active");
	stepNumber?.classList.add("purple");
	title?.classList.add("active-title");
};

// Function to find and activate the most centered step
const updateActiveStep = () => {
	let mostCenteredStep = null;
	let minDistance = Infinity;

	steps.forEach((step) => {
		const rect = step.getBoundingClientRect();
		const elementCenter = rect.top + rect.height / 2;
		const viewportCenter = window.innerHeight / 2;
		const distance = Math.abs(elementCenter - viewportCenter);

		// Check if element is in viewport
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			if (distance < minDistance) {
				minDistance = distance;
				mostCenteredStep = step;
			}
		}
	});

	// Deactivate all steps first
	deactivateAllSteps();

	// Activate only the most centered step
	if (mostCenteredStep) {
		activateStep(mostCenteredStep);
	}
};

// Use scroll event with throttling for better performance
let ticking = false;
const handleScroll = () => {
	if (!ticking) {
		window.requestAnimationFrame(() => {
			updateActiveStep();
			ticking = false;
		});
		ticking = true;
	}
};

// Initial check
updateActiveStep();

// Listen to scroll events
window.addEventListener("scroll", handleScroll);
