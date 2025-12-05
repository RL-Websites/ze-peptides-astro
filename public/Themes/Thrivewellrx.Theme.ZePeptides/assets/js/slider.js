$(document).ready(function () {
	new Swiper(".product__wrapper", {
		loop: true,

		navigation: {
			nextEl: ".next-arrow",
			prevEl: ".prev-arrow",
		},
		autoplay: {
			delay: 3000,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 15,
				grid: {
					rows: 1,
					fill: "row",
				},
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 35,
				grid: {
					rows: 2,
					fill: "row",
				},
			},
		},
	});
	new Swiper(".client__feedbacks", {
		loop: true,

		navigation: {
			nextEl: ".next-arrow",
			prevEl: ".prev-arrow",
		},
		// autoplay: {
		// 	delay: 3000,
		// },
		breakpoints: {
			0: {
				slidesPerView: 1.3,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 1.8,
				spaceBetween: 15,
			},
			992: {
				slidesPerView: 2.5,
				spaceBetween: 35,
			},
		},
	});

	new Swiper(".related_product_slider", {
		spaceBetween: 20,
		loop: true,
		navigation: {
			nextEl: ".product__arrow--left",
			prevEl: ".product__arrow--right",
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},

			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
		},
	});

	new Swiper(".products__filter-btns", {
		spaceBetween: 12,
		loop: false,
		slidesPerView: "auto",
		navigation: {
			nextEl: ".products__filter-right",
			prevEl: ".products__filter-left",
		},
	});

	new Swiper(".feedback__slider", {
		spaceBetween: 20,
		loop: true,
		// autoplay: {
		// 	delay: 2500,
		// 	disableOnInteraction: false,
		// },
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 15,
				centerInsufficientSlides: true,
			},
			768: {
				slidesPerView: 2,
				centerInsufficientSlides: true,
			},
			992: {
				slidesPerView: 3,
				centerInsufficientSlides: true,
			},
		},
	});

	new Swiper(".mySwiper", {
		slidesPerView: 3,
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

	new Swiper(".home-product-slider", {
		spaceBetween: 20,
		loop: true,
		// autoplay: {
		// 	delay: 2500,
		// 	disableOnInteraction: false,
		// },
		navigation: {
			nextEl: ".product__arrow--right",
			prevEl: ".product__arrow--left",
		},
		breakpoints: {
			0: {
				slidesPerView: 1.3,
				centerInsufficientSlides: true,
			},
			576: {
				slidesPerView: 2,
				centerInsufficientSlides: true,
			},
			992: {
				slidesPerView: 3,
				centerInsufficientSlides: true,
			},
		},
	});

	new Swiper(".product__items--alt", {
		spaceBetween: 20,
		loop: true,

		navigation: {
			nextEl: ".next-arrow",
			prevEl: ".prev-arrow",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1.3,
				spaceBetween: 15,
				centerInsufficientSlides: true,
			},
			768: {
				slidesPerView: 2.2,
				centerInsufficientSlides: true,
			},
			992: {
				slidesPerView: 2.2,
				centerInsufficientSlides: true,
			},
		},
	});
});
