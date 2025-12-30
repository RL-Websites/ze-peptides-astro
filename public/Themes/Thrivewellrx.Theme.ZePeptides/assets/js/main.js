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
    console.log('🚀 Avatar Cropper initialized');

    // DOM Elements
    const profileAvatar = document.getElementById("profileAvatar");
    const openBtn = document.getElementById("openAvatarModalBtn");
    const modalEl = document.getElementById("avatarModal");
    const fileInput = document.getElementById("avatarFile");
    const cropperImg = document.getElementById("cropperImage");
    const controls = document.getElementById("cropperControls");
    const saveBtn = document.getElementById("saveAvatarBtn");
    const errorBox = document.getElementById("avatarError");
    const successBox = document.getElementById("avatarSuccess");
    const dropZone = document.getElementById("dropZone");
    const uploadProgress = document.getElementById("uploadProgress");
    const cropPreview = document.getElementById("cropPreview");

    // Control buttons
    const zoomInBtn = document.getElementById("zoomInBtn");
    const zoomOutBtn = document.getElementById("zoomOutBtn");
    const rotateLeftBtn = document.getElementById("rotateLeftBtn");
    const rotateRightBtn = document.getElementById("rotateRightBtn");
    const resetBtn = document.getElementById("resetBtn");

    // Bootstrap modal instance
    const bsModal = new bootstrap.Modal(modalEl, { backdrop: "static" });

    let cropper = null;
    let objectUrl = null;

    // Configuration
    const CONFIG = {
        maxSizeMB: 8,
        minDimensions: 150,
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        cropSize: 512,
        quality: 0.9
    };

    // ---- Helper Functions ----
    function showError(message) {
        console.error('❌ Error:', message);
        errorBox.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${message}`;
        errorBox.classList.remove("d-none");
        hideSuccess();
    }

    function showSuccess(message) {
        console.log('✅ Success:', message);
        successBox.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
        successBox.classList.remove("d-none");
        hideError();
    }

    function hideError() {
        errorBox.classList.add("d-none");
    }

    function hideSuccess() {
        successBox.classList.add("d-none");
    }

    function clearMessages() {
        hideError();
        hideSuccess();
    }

    function showToast(message, type = 'success') {
        const toastEl = document.getElementById('successToast');
        const toastBody = document.getElementById('successMessage');
        
        if (toastEl && toastBody) {
            toastBody.textContent = message;
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        }
    }

    function updateProgressBar(percent) {
        const progressBar = uploadProgress.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = percent + '%';
            progressBar.setAttribute('aria-valuenow', percent);
        }
    }

    function showProgress() {
        uploadProgress.classList.remove('d-none');
        updateProgressBar(0);
    }

    function hideProgress() {
        uploadProgress.classList.add('d-none');
        updateProgressBar(0);
    }

    function updatePreview() {
        if (!cropper || !cropPreview) return;
        
        try {
            const canvas = cropper.getCroppedCanvas({
                width: 100,
                height: 100,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: "high"
            });
            
            if (canvas) {
                cropPreview.src = canvas.toDataURL('image/jpeg', 0.8);
                cropPreview.style.display = 'block';
            }
        } catch (err) {
            console.warn('Preview update failed:', err);
        }
    }

    function cleanupPreview() {
        console.log('🧹 Cleaning up preview...');
        
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-save me-2"></i>Save';
        controls.classList.add("d-none");
        hideProgress();

        if (cropper) {
            cropper.destroy();
            cropper = null;
        }

        cropperImg.style.display = "none";
        cropperImg.removeAttribute("src");

        if (cropPreview) {
            cropPreview.style.display = "none";
            cropPreview.removeAttribute("src");
        }

        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            objectUrl = null;
        }

        // Reset input
        fileInput.value = "";
        clearMessages();
    }

    function validateFile(file) {
        console.log('🔍 Validating file:', file.name, file.type, file.size);

        if (!CONFIG.allowedTypes.includes(file.type)) {
            throw new Error("Please select a valid image file (JPEG, PNG, or WebP).");
        }

        if (file.size > CONFIG.maxSizeMB * 1024 * 1024) {
            throw new Error(`Image is too large. Please upload an image under ${CONFIG.maxSizeMB}MB.`);
        }

        return true;
    }

    async function validateImageDimensions(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function() {
                if (img.width < CONFIG.minDimensions || img.height < CONFIG.minDimensions) {
                    reject(new Error(`Image is too small. Minimum size is ${CONFIG.minDimensions}×${CONFIG.minDimensions} pixels.`));
                } else {
                    console.log('✅ Image dimensions valid:', img.width, 'x', img.height);
                    resolve(true);
                }
            };
            img.onerror = () => reject(new Error("Invalid image file."));
            img.src = URL.createObjectURL(file);
        });
    }

    async function initializeCropper(file) {
        console.log('🔄 Initializing cropper...');
        
        try {
            await validateImageDimensions(file);
        } catch (err) {
            showError(err.message);
            cleanupPreview();
            return;
        }

        // Cleanup old cropper
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
        }

        objectUrl = URL.createObjectURL(file);
        cropperImg.src = objectUrl;
        cropperImg.style.display = "block";

        // Wait for image to load
        cropperImg.onload = function () {
            console.log('🖼️ Image loaded, creating cropper...');
            
            cropper = new Cropper(cropperImg, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: "move",
                autoCropArea: 0.8,
                responsive: true,
                background: false,
                checkOrientation: true,
                guides: true,
                center: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: false,

                ready() {
                    console.log('✅ Cropper ready!');
                    controls.classList.remove("d-none");
                    saveBtn.disabled = false;
                    updatePreview();
                },

                crop: updatePreview,
                zoom: updatePreview,
                rotate: updatePreview
            });
        };

        cropperImg.onerror = function() {
            showError("Failed to load the selected image.");
            cleanupPreview();
        };
    }

    // ---- Event Listeners ----

    // Open modal - both button and image click
    function openModal() {
        console.log('📖 Opening avatar modal...');
        cleanupPreview();
        bsModal.show();
    }

    if (openBtn) {
        openBtn.addEventListener("click", openModal);
    }

    if (profileAvatar) {
        profileAvatar.addEventListener("click", openModal);
        profileAvatar.addEventListener("keydown", function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    }

    // Modal cleanup
    modalEl.addEventListener("hidden.bs.modal", function () {
        console.log('🚪 Modal closed, cleaning up...');
        cleanupPreview();
    });

    // File input change
    fileInput.addEventListener("change", async function (e) {
        clearMessages();
        console.log('📁 File input changed...');

        const file = e.target.files && e.target.files[0];
        if (!file) return;

        try {
            validateFile(file);
            await initializeCropper(file);
        } catch (err) {
            showError(err.message);
            cleanupPreview();
        }
    });

    // Drag & Drop functionality
    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropZone.classList.add('drag-over');
        }

        function unhighlight(e) {
            dropZone.classList.remove('drag-over');
        }

        dropZone.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;

            if (files.length > 0) {
                fileInput.files = files;
                fileInput.dispatchEvent(new Event('change'));
            }
        }
    }

    // Cropper controls
    if (zoomInBtn) zoomInBtn.addEventListener("click", () => cropper && cropper.zoom(0.1));
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => cropper && cropper.zoom(-0.1));
    if (rotateLeftBtn) rotateLeftBtn.addEventListener("click", () => cropper && cropper.rotate(-10));
    if (rotateRightBtn) rotateRightBtn.addEventListener("click", () => cropper && cropper.rotate(10));
    if (resetBtn) resetBtn.addEventListener("click", () => cropper && cropper.reset());

    // Keyboard shortcuts
    modalEl.addEventListener("keydown", function(e) {
        if (!cropper) return;
        
        switch(e.key) {
            case "=":
            case "+":
                e.preventDefault();
                cropper.zoom(0.1);
                break;
            case "-":
                e.preventDefault();
                cropper.zoom(-0.1);
                break;
            case "ArrowLeft":
                if (e.ctrlKey) {
                    e.preventDefault();
                    cropper.rotate(-10);
                }
                break;
            case "ArrowRight":
                if (e.ctrlKey) {
                    e.preventDefault();
                    cropper.rotate(10);
                }
                break;
            case "r":
                if (e.ctrlKey) {
                    e.preventDefault();
                    cropper.reset();
                }
                break;
        }
    });

    // Save functionality
    saveBtn.addEventListener("click", async function () {
        clearMessages();
        if (!cropper) return;

        console.log('💾 Saving avatar...');

        const originalHTML = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
        
        showProgress();

        try {
            // Simulate progress
            updateProgressBar(10);

            // Generate cropped image
            const canvas = cropper.getCroppedCanvas({
                width: CONFIG.cropSize,
                height: CONFIG.cropSize,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: "high",
            });

            updateProgressBar(30);

            if (!canvas) {
                throw new Error("Unable to crop the image. Please try a different file.");
            }

            updateProgressBar(50);

            // Convert to blob
            const blob = await new Promise((resolve) =>
                canvas.toBlob(resolve, "image/jpeg", CONFIG.quality)
            );
            
            if (!blob) {
                throw new Error("Could not create image blob.");
            }

            updateProgressBar(70);

            // Build form data
            const formData = new FormData();
            formData.append("avatar", blob, "avatar.jpg");

            updateProgressBar(80);

            // For demo purposes, we'll simulate an upload
            // Replace this with your actual API endpoint
            const response = await simulateUpload(formData);

            updateProgressBar(100);

            // Update UI
            const avatarUrl = response.avatarUrl;
            if (profileAvatar) {
                profileAvatar.src = avatarUrl + "?v=" + Date.now();
            }

            showToast("Profile photo updated successfully!");
            showSuccess("Avatar updated successfully!");
            
            setTimeout(() => {
                bsModal.hide();
            }, 1500);

        } catch (err) {
            console.error('❌ Save error:', err);
            showError(err.message || "Something went wrong.");
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalHTML;
            hideProgress();
        }
    });

    // Simulate upload function (replace with your actual API call)
    async function simulateUpload(formData) {
        console.log('🔄 Simulating upload...');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, create a data URL from the blob
        const blob = formData.get('avatar');
        const dataUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });

        // Simulate successful response
        return {
            success: true,
            avatarUrl: dataUrl,
            message: "Avatar uploaded successfully"
        };

        // In real implementation, use this:
        /*
        const response = await fetch("/api/profile/avatar", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Upload failed. Please try again.");
        }

        const data = await response.json();
        if (!data.avatarUrl) {
            throw new Error("Server did not return avatar URL.");
        }

        return data;
        */
    }

    console.log('✅ Avatar Cropper setup complete');
	console.log(cropperImg)

})();
