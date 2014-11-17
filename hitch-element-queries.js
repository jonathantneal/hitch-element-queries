(function (sourceIframe, preventLoop) {
	var

	// define filters
	filters = {
		minWidth: function (metrics, value) {
			return metrics.width >= value;
		},
		maxWidth: function (metrics, value) {
			return metrics.width <= value;
		},
		minHeight: function (metrics, value) {
			return metrics.height >= value;
		},
		maxHeight: function (metrics, value) {
			return metrics.height <= value;
		},
		minAspectRatio: function (metrics, value) {
			return metrics.aspectRatio >= value;
		},
		maxAspectRatio: function (metrics, value) {
			return metrics.aspectRatio <= value;
		},
		orientation: function (metrics, value) {
			return metrics.orientation === value;
		}
	},

	// assign iframe base
	iframe = document.createElement('iframe'),

	// assign faux body
	body = document.documentElement.appendChild(document.createElement('body')),

	rem;

	// style iframe base hidden from layout
	iframe.style.cssText = 'border:0;bottom:0;clip:rect(0 0 0 0);height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1';

	body.appendChild(iframe);

	// append sensor em node
	iframe.contentWindow.document.write('<div id=em style=height:1em;overflow:hidden>');
	iframe.contentWindow.document.close();

	// collect rem size
	rem = iframe.contentWindow.em.clientHeight;

	// remove faux body
	document.documentElement.removeChild(body);

	// for each filter
	Object.keys(filters).forEach(function (key) {
		// add filter
		Hitch.add({
			name: key.replace(/[A-Z]/, '-$&').toLowerCase(),
			filter: function (element, value, resolve) {
				element.initalized = element.initalized || {};

				// never run after this is initialized
				if (element.initalized[key]) {
					return;
				}

				element.initalized[key] = true;

				var

				// assign universal metrics
				metrics = {
					cm: 37.7952,
					em: rem,
					in: 96,
					mm: 3.77952,
					pc: 16,
					pt: 4 / 3,
					px: 1,
					rem: rem
				},

				// assign sensor cloned from iframe base
				sensor = element.appendChild(iframe.cloneNode(true)),

				// assign iframe DOM
				swindow = sensor.contentWindow,
				sdocument = swindow.document,
				sdocumentElement,

				addEventListener = swindow.addEventListener || swindow.attachEvent,
				resize = swindow.addEventListener ? 'resize' : 'onresize';

				// assign iframe DOM
				sdocumentElement = sdocument.documentElement;

				// on iframe resize
				function onresize() {
					var
					width = metrics.width = sdocumentElement.offsetWidth;
					height = metrics.height = sdocumentElement.offsetHeight;

					metrics.vmax = Math.max(width, height);
					metrics.vmin = Math.min(width, height);

					metrics.aspectRatio = width / height;

					metrics.orientation = width > height ? 'landscape' : 'portrait';

					resolve(
						filters[key](
							metrics, value.replace(
								/(?:^|\s)(\d+)([a-z]+)(?:\s|$)/g,
								function (match, length, unit) {
									return length * metrics[unit];
								}
							)
						)
					);
				}

				addEventListener(resize, onresize);
			},
			type: 'selector'
		});
	});
})();
