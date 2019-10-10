function getstyle(el, property) {
    if (getComputedStyle) {
        return getComputedStyle(el)[property];
    } else {
        return el.currentStyle[property];
        
    }
}


function animate(el, properties) {
    clearInterval(el.timeId);

    el.timeId = setInterval(function () {
        for (var property in properties) {
            var current;
            var target = properties[property];

            if (property === 'opacity') {
                current = Math.round(parseFloat(getstyle(el, 'opacity')) * 100)
            } else {
                current = parseInt(getstyle(el, property))
            }

            var speed = (target - current) / 20;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (property === 'opacity') {
                el.style.opacity = (current + speed) / 100
            } else {
                el.style[property] = current + speed + 'px'
            }
        }





    }, 20)
}