(function() {
	function LoaderProxy() {
		return {
			draw: $.noop,
			fill: $.noop,
			frame: $.noop,
			update: $.noop,
			width: null,
			height: null
		};
	}

	function Sprite(image, sourceX, sourceY) {
		sourceX = sourceX || 0;
		sourceY = sourceY || 0;
		width = image.width;
		height = image.height;
		return {
			draw: function(canvas, x, y, width, height,flash,flashGap) {
				canvas.drawImage(
				image,
				this.sourceX,
				this.sourceY,
				width,
				height,
				x,
				y,
				width,
				height);
				if(flashGap){
					flash=time%flashGap<10?flash:false;
					if(flash){
						canvas.globalCompositeOperation="source-atop";
						canvas.fillStyle=flash;
						canvas.fillRect(x,y,width,height);
					}
				}
			},

			fill: function(canvas, x, y, width, height, repeat) {
				repeat = repeat || "repeat";
				var pattern = canvas.createPattern(image, repeat);
				canvas.fillRect(x, y, width, height);
				canvas.fillStyle = pattern;
			},

			sourceX: sourceX,
			sourceY: sourceY
		};
	};

	Sprite.load = function(url, sourceX, sourceY, loadedCallback) {
		var img = new Image();
		var proxy = LoaderProxy();

		img.onload = function() {
			var tile = Sprite(this, sourceX, sourceY);
			$.extend(proxy, tile);

			if (loadedCallback) {
				loadedCallback(proxy);
			}
		};

		img.src = url;

		return proxy;
	};

	var spriteImagePath = "images/";

	window.Sprite = function(name, sourceX, sourceY, callback) {
		return Sprite.load(spriteImagePath + name, sourceX, sourceY, callback);
	};
	window.Sprite.EMPTY = LoaderProxy();
	window.Sprite.load = Sprite.load;
}());