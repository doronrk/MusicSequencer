;(function(exports) {
	var BPMCalculator = function(grid) {
		this.grid = grid;
		this.bpm = 0.0;
		this.domElement = new dom.BPMCalculatorDom(this);
		this.domElement.getDomNode().appendTo($("#bpmForm"));
		this.syncElement = new dom.BPMSyncDom(this);
		this.syncElement.getDomNode().appendTo($("#bpmForm"));
		this.currentlyCalcuating = false;
		this.prevClick;
		this.deltas = [];
		this.handleClick = function(s, ms) {
			var time = s * 1000 + ms;
			if (this.currentlyCalcuating) {
				var delta = time - this.prevClick;
				if (delta < 0) {
					return;
				}
				this.prevClick = time;
				console.log(this.bpm, this.deltas);
				if (delta > 2000) {
					this.deltas = [];
					this.bpm = 0.0;
					this.currentlyCalcuating = false;
				}
				else {
					this.deltas.push(delta);
					if (this.deltas.length > 15) {
						this.deltas.shift();
					}
					var msPerBeat = this.avgDelta();
					this.bpm = this.msToBPM(msPerBeat);
					var displayBPM = Math.round(this.bpm * 100)/100;
					this.domElement.getDomNode().get(0).innerHTML = displayBPM.toString();
				}
			}
			else {
				this.prevClick = time;
				this.currentlyCalcuating = true;
			}
		}
		this.avgDelta = function() {
			return this.deltas.reduce(function(memo, num) {
				return memo + num;
			}, 0) / this.deltas.length;
		}
		this.msToBPM = function(ms) {
			var beatperMS = 1.0/ms;
			var beatperSecond = beatperMS * 1000;
			var beatperMinute = beatperSecond * 60;
			return beatperMinute;
		}
	}
	exports.BPMCalculator = BPMCalculator;
}(this));