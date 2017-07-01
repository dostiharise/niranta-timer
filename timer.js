var timeModel = (function() {

    var _timeInSeconds = 0;

    return {
        getSeconds: _getSecondsElapsed,
        getMinutes: _getMinutesElapsed,
        getHours: _getHoursElapsed,
        tick: _addASecond,
        reset: _resetTime
    };

    function _addASecond() {
        _timeInSeconds++;
    }

    function _resetTime() {
        _timeInSeconds = 0;
    }

    function _getSecondsElapsed() {
        return _timeInSeconds % 60;
    }

    function _getMinutesElapsed() {
        return _getMinutesRemaining() % 60;
    }

    function _getMinutesRemaining() {
        return Math.floor(_timeInSeconds / 60);
    }

    function _getHoursElapsed() {
        return Math.floor(_getMinutesRemaining() / 60);
    }
})();

var timerView = (function() {

    var _$hoursSpan; 
    var _$minutesSpan;
    var _$secondsSpan;

    return {
        init: _init,
        render: _render
    };

    function _init() {
        _$hoursSpan = $('#hoursSpan');
        _$minutesSpan = $('#minutesSpan');
        _$secondsSpan = $('#secondsSpan');
    }

    function _format(value) {
        if(value < 10) {
            return "0"+value;
        }

        return "" + value;
    }

    function _render(timeModel) {
        _$hoursSpan.text(_format(timeModel.getHours()));
        _$minutesSpan.text(_format(timeModel.getMinutes()));
        _$secondsSpan.text(_format(timeModel.getSeconds()));
    }
    
})();

var timeController = (function() {

    var _timer;

    return {
        onStartOrReset: _startOrReset,
        onPauseOrResume: _pauseOrResume
    };

    function _resume() {
        _timer = window.setInterval(function() {
            timeModel.tick();
            timerView.render(timeModel);
        }, 1000);
    }

    function _stop() {
        window.clearInterval(_timer);
        _timer = null;
    }    

    function _startOrReset() {
        
        if(_timer) {
            _reset();
        }

        _resume();
    }

    function _pauseOrResume() {
        if(_timer) {
            _stop();
        } else {
            _resume();
        }
    }

    function _reset() {
        _stop();
        timeModel.reset();
    }
})();

// do binding and init
$(document).ready(function() {

    timerView.init();

    $('#startOrRestartButton').on('click', function() {
        timeController.onStartOrReset();
    });

    $('#pauseOrResumeButton').on('click', function() {
        timeController.onPauseOrResume();
    });

});

