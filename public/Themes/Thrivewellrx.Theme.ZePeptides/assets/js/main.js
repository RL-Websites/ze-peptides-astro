// Header, menu, scrolling, toasts, etc.
$(document).ready(function () {
	document.addEventListener("keydown", function (e) {
		const el = e.target;

		if (!el || (el.id !== "expiry" && el.id !== "cvc" && el.id !== "zipCode"))
			return;

		// allow control keys
		if (
			e.key === "Backspace" ||
			e.key === "Delete" ||
			e.key === "ArrowLeft" ||
			e.key === "ArrowRight" ||
			e.key === "Tab"
		) {
			return;
		}

		// allow digits only
		if (!/^[0-9]$/.test(e.key)) {
			e.preventDefault(); // ✅ WORKS (JS side)
		}
	});
	// AOS init (guarded)
	if (window.AOS && typeof AOS.init === "function") {
		AOS.init();
	}

	// Tooltip
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	// Hamburger menu
	$(document).on("click", ".hamburger-menu", function () {
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

	// User dropdown toggle
	$(document).on("click", "#user-menu-btn, #user-menu-btn-mob", function () {
		$(this).next(".user-dropdown").toggleClass("show");
	});

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

	// Scroll to top
	$(".scrollToTop").on("click", function () {
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			"slow"
		);
	});

	// Toast
	$("#liveToastBtn").on("click", function () {
		var toastEl = $("#liveToast");
		if (toastEl.length && window.bootstrap && bootstrap.Toast) {
			var toast = new bootstrap.Toast(toastEl[0]);
			toast.show();
		}
	});

	// Get Started / Browse Products (delegated so it works after SPA navigation)
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
		const baseUrl = $("#homeUrl").val();
		if (baseUrl) {
			window.location.href = baseUrl + "?loc=product";
		} else {
			window.location.href = "?loc=product";
		}
	});
	// 	// Product Read More
	// 	$(document).on("click", "#readMore", function () {
	// 		const parent = $(this).parents(".product-hero__details");
	// 		parent.toggleClass("show");
	// 		$(this).text(parent.hasClass("show") ? "Read Less" : "Read More");
	// 	});
	// });
	const $details = $(".product-hero__details");
	const $readMore = $("#readMore");
	const $parent = $readMore.parents(".product-hero__details");

	// Get the actual text content (excluding the "Read More" div)
	const textContent = $details
		.clone()
		.children(".read-more")
		.remove()
		.end()
		.text()
		.trim();

	// If text is less than 50 characters, hide "Read More" and ensure content is fully visible
	if (textContent.length < 640) {
		$readMore.hide();
		$parent.addClass("show"); // Optionally force full visibility
	} else {
		$readMore.show();
	}

	// Existing toggle functionality
	$(document).on("click", "#readMore", function () {
		$parent.toggleClass("show");
		$(this).text($parent.hasClass("show") ? "Read Less" : "Read More");
	});
});
// Numeric-only input handlers
$(document).on("input", ".numeric-only", function () {
	this.value = this.value.replace(/[^0-9]/g, "");
});

$(document).on("paste", ".numeric-only", function () {
	var $this = $(this);
	setTimeout(function () {
		$this.val($this.val().replace(/[^0-9]/g, ""));
	}, 10);
});

// DOB datepicker + timeline scripts
document.addEventListener("DOMContentLoaded", () => {
	console.log("hello");

	if (typeof initDobDatepicker === "function") {
		try {
			initDobDatepicker("#dobField", "#dobError");
			initDobDatepicker("#myProfileDob", "#myProfileDobError");
		} catch (err) {
			console.warn("initDobDatepicker error:", err);
		}
	}
});

// Desktop timeline helpers
const getSteps = () =>
	document.querySelectorAll(".timeline-step[data-observed]");

// Remove active class from all steps
const deactivateAllSteps = () => {
	const steps = getSteps();
	steps.forEach((step) => {
		const dot = step.querySelector(".timeline-dot");
		const stepNumber = step.querySelector(".step-number");
		const title = step.querySelector(".step-title");

		dot?.classList.remove("active");
		stepNumber?.classList.remove("purple");
		title?.classList.remove("active-title");
	});
};

// Activate a specific step
const activateStep = (step) => {
	const dot = step.querySelector(".timeline-dot");
	const stepNumber = step.querySelector(".step-number");
	const title = step.querySelector(".step-title");

	dot?.classList.add("active");
	stepNumber?.classList.add("purple");
	title?.classList.add("active-title");
};

// Find and activate the most centered step
const updateActiveStep = () => {
	const steps = getSteps();
	if (!steps.length) return;

	let mostCenteredStep = null;
	let minDistance = Infinity;

	const viewportCenter = window.innerHeight / 2;

	steps.forEach((step) => {
		const rect = step.getBoundingClientRect();
		const elementCenter = rect.top + rect.height / 2;
		const distance = Math.abs(elementCenter - viewportCenter);

		if (rect.top < window.innerHeight && rect.bottom > 0) {
			if (distance < minDistance) {
				minDistance = distance;
				mostCenteredStep = step;
			}
		}
	});

	deactivateAllSteps();

	if (mostCenteredStep) {
		activateStep(mostCenteredStep);
	}
};

// Scroll throttling for desktop timeline
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

// Mobile timeline helpers
const getMobileSteps = () =>
	document.querySelectorAll(".mobile-timeline-step[data-observed]");

// Remove active class from all mobile steps
const deactivateAllMobileSteps = () => {
	const mobileSteps = getMobileSteps();

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
		if (line) {
			line.style.height = "0";
		}
	});
};

// Activate a specific mobile step
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
	if (line) {
		line.style.height = "var(--line-height)";
	}
};

// Find and activate the most centered mobile step
const updateActiveMobileStep = () => {
	const mobileSteps = getMobileSteps();
	if (!mobileSteps.length) return;

	let mostCenteredStep = null;
	let minDistance = Infinity;

	const viewportCenter = window.innerHeight / 2;

	mobileSteps.forEach((step) => {
		const rect = step.getBoundingClientRect();
		const elementCenter = rect.top + rect.height / 2;
		const distance = Math.abs(elementCenter - viewportCenter);

		if (rect.top < window.innerHeight && rect.bottom > 0) {
			if (distance < minDistance) {
				minDistance = distance;
				mostCenteredStep = step;
			}
		}
	});

	deactivateAllMobileSteps();

	if (mostCenteredStep) {
		activateMobileStep(mostCenteredStep);
	}
};

// Scroll throttling for mobile timeline
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
getMobileSteps().forEach((step) => {
	step.style.setProperty("--dot-gap", "2rem");
	step.style.setProperty("--line-height", "calc(100% - 14px)");
});

// Initial check for mobile
updateActiveMobileStep();

// Listen to scroll events for mobile
window.addEventListener("scroll", handleMobileScroll);

$(window).on("load", function () {
	setTimeout(function () {
		$("#page-loader").fadeOut(300, function () {
			$(this).remove();
		});
	}, 500); // 0.5s delay
});
