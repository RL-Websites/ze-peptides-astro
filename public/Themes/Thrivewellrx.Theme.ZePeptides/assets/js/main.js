$(document).ready(function () {
	AOS.init();
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
	$(document).on("click", "#browseProducts", function () {
		const productSection = $(".product");

		if (productSection.length) {
			$("html, body").animate(
				{
					scrollTop: productSection.offset().top - 75,
				},

				"smooth"
			);
		}
	});

	$(document).on("click", "#getStartedBtn", function () {
		const productSection = $(".product");

		if (productSection.length) {
			$("html, body").animate(
				{
					scrollTop: productSection.offset().top - 75,
				},

				"smooth"
			);
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

document.addEventListener("DOMContentLoaded", () => {
	console.log("hello");

	initDobDatepicker("#dobField", "#dobError");
	initDobDatepicker("#myProfileDob", "#myProfileDobError");
});

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

// Mobile Timeline Script
const mobileSteps = document.querySelectorAll(".mobile-timeline-step[data-observed]");

// Function to remove active class from all mobile steps
const deactivateAllMobileSteps = () => {
	mobileSteps.forEach((step) => {
		const dot = step.querySelector(".mobile-dot");
		const stepNumber = step.querySelector(".mobile-step-number");
		const title = step.querySelector(".mobile-step-title");
		const line = step.querySelector(".mobile-dot-line");
		const description = step.querySelector(".mobile-number-description");

		if (dot) dot.classList.remove("active");
		if (stepNumber) stepNumber.classList.remove("purple");
		if (title) title.classList.remove("active-title");
		if (description) description.classList.remove("active-title");
		// Reset line when step is not active
		if (line) {
			line.style.height = "0";
		}
	});
};

// Function to activate a specific mobile step
const activateMobileStep = (step) => {
	const dot = step.querySelector(".mobile-dot");
	const stepNumber = step.querySelector(".mobile-step-number");
	const title = step.querySelector(".mobile-step-title");
	const line = step.querySelector(".mobile-dot-line");
	const description = step.querySelector(".mobile-number-description");

	if (dot) dot.classList.add("active");
	if (stepNumber) stepNumber.classList.add("purple");
	if (title) title.classList.add("active-title");
	if (description) description.classList.add("active-title");
	// Animate line when step becomes active
	if (line) {
		line.style.height = "var(--line-height)";
	}
};

// Function to find and activate the most centered mobile step
const updateActiveMobileStep = () => {
	let mostCenteredStep = null;
	let minDistance = Infinity;

	mobileSteps.forEach((step) => {
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
	deactivateAllMobileSteps();

	// Activate only the most centered step
	if (mostCenteredStep) {
		activateMobileStep(mostCenteredStep);
	}
};

// Use scroll event with throttling for better performance
let mobileTickingState = false;
const handleMobileScroll = () => {
	if (!mobileTickingState) {
		window.requestAnimationFrame(() => {
			updateActiveMobileStep();
			mobileTickingState = false;
		});
		mobileTickingState = true;
	}
};

// Set CSS custom properties for all mobile steps
mobileSteps.forEach((step) => {
	step.style.setProperty("--dot-gap", "2rem");
	step.style.setProperty("--line-height", "calc(100% - 14px)");
});

// Initial check for mobile
updateActiveMobileStep();

// Listen to scroll events for mobile
window.addEventListener("scroll", handleMobileScroll);
