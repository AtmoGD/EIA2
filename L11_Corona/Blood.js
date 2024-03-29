"use strict";
var L11_Corona;
(function (L11_Corona) {
    class Blood extends L11_Corona.Drawable {
        constructor(_position, _velocity, _size) {
            let position = _position ? _position : new L11_Corona.Vector(random(0, L11_Corona.canvas.width), random(0, L11_Corona.canvas.height));
            let velocity = _velocity ? _velocity : new L11_Corona.Vector(random(125, 175), random(-10, 10));
            let size = _size ? _size : random(20, 50);
            let bloodColor = L11_Corona.crc.createRadialGradient(0, 0, 0, 0, 0, size);
            bloodColor.addColorStop(0, "HSL(360, 100%, 2%)");
            bloodColor.addColorStop(1, "HSL(360, 80%, 35%)");
            super(position, velocity, size, bloodColor);
            this.draw();
        }
        draw() {
            this.drawCircle(this.position, this.size);
        }
        update(_timeslice) {
            if (this.position.x > L11_Corona.crc.canvas.width)
                this.position.x = 0;
            if (this.position.y > L11_Corona.crc.canvas.height)
                this.position.y = 0;
            if (this.position.y < 0)
                this.position.y = L11_Corona.crc.canvas.height;
            let offset = new L11_Corona.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            this.draw();
        }
        drawCircle(_position, _size) {
            L11_Corona.crc.fillStyle = this.color;
            L11_Corona.crc.save();
            L11_Corona.crc.translate(_position.x, _position.y);
            L11_Corona.crc.beginPath();
            L11_Corona.crc.arc(0, 0, _size, 0, 2 * Math.PI);
            L11_Corona.crc.closePath();
            L11_Corona.crc.fill();
            L11_Corona.crc.restore();
        }
    }
    L11_Corona.Blood = Blood;
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
})(L11_Corona || (L11_Corona = {}));
//# sourceMappingURL=Blood.js.map