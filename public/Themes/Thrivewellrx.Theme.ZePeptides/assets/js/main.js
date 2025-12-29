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
	const details = $(".product-hero__details");
	const readMore = $("#readMore");
	const parent = readMore.parents(".product-hero__details");

	// Get the actual text content (excluding the "Read More" div)
	const textContent = details
		.clone()
		.children(".read-more")
		.remove()
		.end()
		.text()
		.trim();

	// If text is less than 50 characters, hide "Read More" and ensure content is fully visible
	if (textContent.length < 640) {
		readMore.hide();
		parent.addClass("show"); // Optionally force full visibility
	} else {
		readMore.show();
	}

	// Existing toggle functionality
	$(document).on("click", "#readMore", function () {
		parent.toggleClass("show");
		$(this).text(parent.hasClass("show") ? "Read Less" : "Read More");
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
// my profile image  js code
(function () {
	// عناصر
	const openBtn = document.getElementById("openAvatarModalBtn");
	const modalEl = document.getElementById("avatarModal");
	const fileInput = document.getElementById("avatarFile");
	const cropperImg = document.getElementById("cropperImage");
	const controls = document.getElementById("cropperControls");
	const saveBtn = document.getElementById("saveAvatarBtn");
	const avatarImg = document.getElementById("profileAvatar");
	const errorBox = document.getElementById("avatarError");

	// Control buttons
	const zoomInBtn = document.getElementById("zoomInBtn");
	const zoomOutBtn = document.getElementById("zoomOutBtn");
	const rotateLeftBtn = document.getElementById("rotateLeftBtn");
	const rotateRightBtn = document.getElementById("rotateRightBtn");
	const resetBtn = document.getElementById("resetBtn");

	const bsModal = new bootstrap.Modal(modalEl, { backdrop: "static" });

	let cropper = null;
	let objectUrl = null;

	// ---- helpers ----
	function showError(message) {
		errorBox.textContent = message;
		errorBox.classList.remove("d-none");
	}

	function clearError() {
		errorBox.textContent = "";
		errorBox.classList.add("d-none");
	}

	function cleanupPreview() {
		saveBtn.disabled = true;
		controls.classList.add("d-none");

		if (cropper) {
			cropper.destroy();
			cropper = null;
		}

		cropperImg.style.display = "none";
		cropperImg.removeAttribute("src");

		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			objectUrl = null;
		}

		// Reset input so user can re-pick same file
		fileInput.value = "";
		clearError();
	}

	// ---- open modal ----
	openBtn.addEventListener("click", function () {
		cleanupPreview();
		bsModal.show();
	});

	// Clean up when modal fully hidden
	modalEl.addEventListener("hidden.bs.modal", function () {
		cleanupPreview();
	});

	// ---- file select -> init cropper ----
	fileInput.addEventListener("change", function (e) {
		clearError();

		const file = e.target.files && e.target.files[0];
		if (!file) return;

		// basic validation
		if (!file.type.startsWith("image/")) {
			showError("Please select a valid image file.");
			cleanupPreview();
			return;
		}

		const maxMB = 8;
		if (file.size > maxMB * 1024 * 1024) {
			showError(
				"Image is too large. Please upload an image under " + maxMB + "MB."
			);
			cleanupPreview();
			return;
		}

		// cleanup old
		if (cropper) {
			cropper.destroy();
			cropper = null;
		}
		if (objectUrl) URL.revokeObjectURL(objectUrl);

		objectUrl = URL.createObjectURL(file);
		cropperImg.src = objectUrl;
		cropperImg.style.display = "block";

		// Wait for image to load before creating cropper
		cropperImg.onload = function () {
			cropper = new Cropper(cropperImg, {
				// Typical profile photo: square crop
				aspectRatio: 1,
				viewMode: 1, // keep crop box within canvas
				dragMode: "move",
				autoCropArea: 0.9,
				responsive: true,
				background: false,
				checkOrientation: true,

				// Better UX for avatars
				guides: true,
				center: true,
				highlight: false,

				ready() {
					controls.classList.remove("d-none");
					saveBtn.disabled = false;
				},
			});
		};
	});

	// ---- cropper controls ----
	zoomInBtn.addEventListener("click", () => cropper && cropper.zoom(0.1));
	zoomOutBtn.addEventListener("click", () => cropper && cropper.zoom(-0.1));
	rotateLeftBtn.addEventListener("click", () => cropper && cropper.rotate(-10));
	rotateRightBtn.addEventListener("click", () => cropper && cropper.rotate(10));
	resetBtn.addEventListener("click", () => cropper && cropper.reset());

	// ---- save (crop -> upload) ----
	saveBtn.addEventListener("click", async function () {
		clearError();
		if (!cropper) return;

		saveBtn.disabled = true;
		saveBtn.textContent = "Saving...";

		try {
			// Generate cropped image
			const canvas = cropper.getCroppedCanvas({
				width: 512,
				height: 512,
				imageSmoothingEnabled: true,
				imageSmoothingQuality: "high",
			});

			if (!canvas)
				throw new Error(
					"Unable to crop the image. Please try a different file."
				);

			const blob = await new Promise((resolve) =>
				canvas.toBlob(resolve, "image/jpeg", 0.9)
			);
			if (!blob) throw new Error("Could not create image blob.");

			// Build form data
			const formData = new FormData();
			formData.append("avatar", blob, "avatar.jpg");

			// OPTIONAL: include user id if needed
			// formData.append("userId", "123");

			// Upload to backend (change URL)
			const response = await fetch("/api/profile/avatar", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const text = await response.text();
				throw new Error(text || "Upload failed. Please try again.");
			}

			// Your backend should return the saved avatar URL
			// Example response: { "avatarUrl": "/uploads/avatars/u1.jpg" }
			const data = await response.json();
			if (!data.avatarUrl) throw new Error("Server did not return avatar URL.");

			// Update profile image in UI
			avatarImg.src = data.avatarUrl + "?v=" + Date.now();

			// close modal
			bsModal.hide();
		} catch (err) {
			showError(err.message || "Something went wrong.");
			saveBtn.disabled = false;
		} finally {
			saveBtn.textContent = "Save";
		}
	});
})();
