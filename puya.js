// Vars
var currentCorrectResult = 0;
var correctAnswers = 0;
var wrongAnswers = 0;

// Functions
function generateNewNumbers() {
    // Number one
    var numberOne = Math.floor(Math.random() * 11);
    $( "div.number-one" ).html( numberOne );

    // Number two
    var numberTwo = Math.floor(Math.random() * 11);
    $( "div.number-two" ).html( numberTwo );

    // Assign new result
    this.currentCorrectResult = numberOne + numberTwo;
};

function displayResult(correct) {
    if (correct == true) {
        // Correct
        correctAnswers++;

        if (correctAnswers == 10) {
            $( "div.winning" ).addClass( "show" );
            $( "div.calc-container" ).addClass( "hide");
        }

        // Update pictures
        for (var i = 1; i <= 10; i++) {
            if ($( "div.monster" + i + ".open" ).length > 0) {
                $( "div.monster" + i + ".open" ).removeClass( "open" ).addClass( "correct" );
                return;
            }
            if ($( "div.monster" + i + ".gaggi" ).length > 0) {
                wrongAnswers--;
                $( "div.monster" + i + ".gaggi" ).removeClass( "gaggi" ).addClass( "correct" );
                return;
            }
        }
    } else {
        // Wrong
        wrongAnswers++;

        if (wrongAnswers == 10) {
            $( "div.losing" ).addClass( "show" );
            $( "div.calc-container" ).addClass( "hide");
        }

        // Update pictures
        for (var i = 1; i <= 10; i++) {
            if ($( "div.monster" + i + ".open" ).length > 0) {
                $( "div.monster" + i + ".open" ).removeClass( "open" ).addClass( "gaggi");
                return;
            }
            if ($( "div.monster" + i + ".correct" ).length > 0) {
                correctAnswers--;
                $( "div.monster" + i + ".correct" ).removeClass( "correct" ).addClass( "gaggi" );
                return;
            }
        }
    }
}

// Event Handlers
$( "button.try-again-button" ).click(function() {
    $( "div.calc-container" ).removeClass( "hide" );
    $( "div.final-message" ).removeClass( "show" );
    $( "div.result-image" ).removeClass( "gaggi" ).removeClass( "correct" ).addClass( "open" );

    correctAnswers = 0;
    wrongAnswers = 0;
    generateNewNumbers();
});

$( "button.check-result-button" ).click(function() {
    
    // Get result value
    var fieldResultValue = $( "#calcResult" ).val();

    if (Number.isInteger(+fieldResultValue)) {

        if (+fieldResultValue == currentCorrectResult) {
            displayResult(true);
        } else {
            displayResult(false);
        }

        // Generate new calculation
        generateNewNumbers();
    }

    // Reset field
    $( "#calcResult" ).val('');
});

// Init
this.generateNewNumbers();
