(function () {
	"use strict";
	var $body = document.querySelector('body');

	// Play initial animations on page load.
	window.addEventListener('load', function () {
		window.setTimeout(function () {
			$body.classList.remove('is-preload');
		}, 100);
	});

	// Slideshow Background.
	(function () {
		// Settings.
		var settings = {
			// Images (in the format of 'url': 'alignment').
			images: {
				'./images/bg004.jpg': 'center',
				'./images/bg002.jpg': 'center',
				'./images/bg003.jpg': 'center'
			},
			// Delay.
			delay: 6000
		};

		// Vars.
		var pos = 0,
			lastPos = 0,
			$wrapper, $bgs = [],
			$bg, k, v;

		// Create BG wrapper, BGs.
		$wrapper = document.createElement('div');
		$wrapper.id = 'bg';
		$body.appendChild($wrapper);

		for (k in settings.images) {
			// Create BG.
			$bg = document.createElement('div');
			$bg.style.backgroundImage = 'url("' + k + '")';
			$bg.style.backgroundPosition = settings.images[k];
			$wrapper.appendChild($bg);

			// Add it to array.
			$bgs.push($bg);
		}

		// Main loop.
		$bgs[pos].classList.add('visible');
		$bgs[pos].classList.add('top');

		// Bail if we only have a single BG or the client doesn't support transitions.
		if ($bgs.length === 1 || !('transition' in document.body.style)) {
			return;
		}

		window.setInterval(function () {
			lastPos = pos;
			pos++;

			// Wrap to beginning if necessary.
			if (pos >= $bgs.length) {
				pos = 0;
			}

			// Swap top images.
			$bgs[lastPos].classList.remove('top');
			$bgs[pos].classList.add('visible');
			$bgs[pos].classList.add('top');

			// Hide last image after a short delay.
			window.setTimeout(function () {
				$bgs[lastPos].classList.remove('visible');
			}, settings.delay / 2);

		}, settings.delay);

	})();

	// Signup Form.
	(function () {
		// Vars.
		var $form = document.querySelector('#signup-form'),
			$submit = document.querySelector('#signup-form input[type="submit"]'),
			$message;

		// Bail if addEventListener isn't supported.
		if (!('addEventListener' in $form)) {
			return;
		}

		// Message.
		$message = document.createElement('span');
		$message.classList.add('message');
		$form.appendChild($message);

		$message._show = function (type, text) {
			$message.innerHTML = text;
			$message.classList.add(type);
			$message.classList.add('visible');

			window.setTimeout(function () {
				$message._hide();
			}, 3000);
		};

		$message._hide = function () {
			$message.classList.remove('visible');
		};

		// Events.
		$form.addEventListener('submit', function (event) {
			event.preventDefault();
			// Hide message.
			$message._hide();
			// Disable submit.
			$submit.disabled = true;
			// Process form.
			// Simulating form submission delay
			window.setTimeout(function () {
				// Reset form.
				$form.reset();
				// Enable submit.
				$submit.disabled = false;
				// Show message.
				$message._show('success', '¡Gracias por registrarte!');
				// Uncomment the following line to show an error message.
				// $message._show('failure', 'Algo salió mal. Por favor, inténtalo de nuevo.');
			}, 750);
		});
	})();
})();
