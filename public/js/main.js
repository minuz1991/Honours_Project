$(function() {

    checkCookie();
    var weight = 0.0,
        height = 0,
        age = 0,
        BMR = 0,
        TDEE = 0,
        user = 'user',
        inc = 0,
        units = '',
        metric = false,
        male = true;

    // Modal Boxes

    $("#btn9,#btn0").animatedModal();

    //####################################################################
    // GENDER START
    //####################################################################
    $('#gmale').on("click", function(){
        male = true;
        $('#superBoy,#finishLine').css("display", "block");
        $('#superGirl').css("display", "none");
        // alert(male);
    });

    $('#gfemale').on("click", function(){
        male = false;
        $('#superGirl,#finishLine').css("display", "block");
        $('#superBoy').css("display", "none");
        // alert(male);
    });
    //####################################################################
    // GENDER END
    //####################################################################


    //####################################################################
    // Personal Start
    //####################################################################
    $('#personalDetails input').prop('disabled', true);
    $('#personalDetails input').css('background', 'rgba(255,255,255,0.3)');

    $("#units").change(function () {
        $('#personalDetails input').prop('disabled', false);
        $('#personalDetails input').css('background', 'rgba(255,255,255,1)');
        adjustUnits();
    });

    $('#weightInput').keyup(function(){
        var temp = parseFloat($('#weightInput').val());
        if( isNaN(temp)){
            $('#weightInput').css('background','#CF4A30');
        }else{
            weight = parseFloat($('#weightInput').val());
            $('#weightInput').css('background','#88A825');
        }
    });

    $('#heightInput').keyup(function(){
        var temp = parseFloat($('#heightInput').val());
        if( isNaN(temp)){
            $('#heightInput').css('background','#CF4A30');
        }else{
            height = parseFloat($('#heightInput').val());
            $('#heightInput').css('background','#88A825');
        }
    });

    $('#ageInput').keyup(function(){
        var temp = parseFloat($('#ageInput').val());
        if( isNaN(temp)){
            $('#ageInput').css('background','#CF4A30');
        }else{
            age = parseFloat($('#ageInput').val());
            $('#ageInput').css('background','#88A825');
            calcBMR(weight,height,age);
        }
    });
    //####################################################################
    // Personal END
    //####################################################################

    $('#btn1,#btn2,#btn3,#btn4,#btn5').on('click',function(){
        var btn = parseInt($(this).text());
        calcTDEE(btn);
    });

    $('#btn6,#btn7,#btn8,#btn9,#btn0').on('click',function(){
        var btn = parseInt($(this).attr('id').replace('btn',''));
        calcDefOrSurp(btn);
    });

    function adjustUnits() {
        units = $('#units').val();
        if (units == 'metric') {
            metric = true;
            $('#weightInput').attr('placeholder', 'Your weight in kilos');
            $('#heightInput').attr('placeholder', 'Your height in cm');
        } else {
            metric = false;
            $('#weightInput').attr('placeholder', 'Your weight in lbs');
            $('#heightInput').attr('placeholder', 'Your height in inches');
        }
    }

    function calcBMR(w, h, a){
        //Metric conversion
        if (metric == true) {
            if (male) {
                BMR = 88 + (13.4 * w) + (4.8 * h) - (5.7 * a);
                // alert('Man ' + BMR);
                createCookie(w, h, a);
            } else {
                // alert('Girls bmr' + w + " weight " + h + " height " + a + ' age')
                BMR = 448 + (9.2 * w) + (3.1 * h) - (4.3 * a);
                createCookie(w, h, a);
                // alert('Woman ' +BMR)
            }
            //Doing imperial conversions
        }else{
            if (male) {
                BMR = 88 + (6.1 * w) + (12.2 * h) - (5.7 * a);
                // alert('Man ' + BMR);
                createCookie(w, h, a);
            } else {
                // alert('Girls bmr' + w + " weight " + h + " height " + a + ' age')
                BMR = 448 + (4.2 * w) + (7.9 * h) - (4.3 * a);
                createCookie(w, h, a);
                // alert('Woman ' +BMR)
            }
        }

    }

    function calcTDEE(activityLvl){
        //alert(activityLvl);
        var actLvl = 0;
        switch(activityLvl) {
            case 1:
                actLvl = 1.2;
                break;
            case 2:
                actLvl = 1.375;
                break;
            case 3:
                actLvl = 1.55;
                break;
            case 4:
                actLvl = 1.725;
                break;
            case 5:
                actLvl = 1.9;
                break;
            default:
                $('#screen').text('You forgot to add numbers');
        }

        if(actLvl != 0){
            checkCookie();
            TDEE = BMR * actLvl;
            $('#screen').text('Your total daily energy expenditure: ' + TDEE);
        }
    }

    function calcDefOrSurp(temp){
        var deficit = TDEE;
        var surplus = TDEE;
        switch(temp) {
            case 6:
                alert("HELP");
                break;
            case 7:
                deficit = TDEE * 0.85;
                $('#screen').text('Your daily calories with 15% deficit ' + deficit);
                break;
            case 8:
                surplus = TDEE * 1.1;
                $('#screen').text('Your daily calories with 10% surplus ' + surplus);
                break;
            case 9:
                //units
                // weight = parseInt(prompt('Please enter your weight'));
                // height = parseInt(prompt('Please enter your height'));
                // age = parseInt(prompt('Please enter your age'));
                if(weight != null && height != null && age != null){
                    male = true;
                    calcBMR(weight, height, age);
                    $('#screen').text('Please select activity level')
                }
                break;
            case 0:
                // units
                // weight = parseInt(prompt('Please enter your weight'));
                // height = parseInt(prompt('Please enter your height'));
                // age = parseInt(prompt('Please enter your age'));
                if(weight != null && height != null && age != null){
                    male = false;
                    calcBMR(weight, height, age);
                    $('#screen').text('Please select activity level')
                }

                break;
            default:
                $('#screen').text('Your daily calories with 10% surplus not added');
        }
    }

    function createCookie(w,h,a){
        var d = new Date();
        user = user + inc;
        inc++;
        document.cookie = 'user' + '=' + user + ';' + 'weight' + '=' + w+ ';' + 'height' + '=' +h+ ';' + 'age' + '=' +a+ ';' + 'date' + '=' + d + ';';
    }


    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function checkCookie() {
        var user = getCookie("user");
        if (user != "") {
            alert("Welcome again " + user);
        }
    }

    $('[title!=""]').qtip({
        position: {
            target: 'mouse', // Track the mouse as the positioning target
            adjust: { x: 10, y: 15 } // Offset it slightly from under the mouse
        },
        style: { classes: 'qtip-bootstrap' }
    });

    $('#stat5, #stat6').qtip();

    $('#side1,#side2,#side3,#side4,#side5,#side6,#side7,#side8,#side9').qtip({
        content: {
            text: function(event, api) {
                // Retrieve content from ALT attribute of the $('.selector') element
                return $(this).attr('sideText');
            },
            title: function(event, api) {
                // Retrieve content from ALT attribute of the $('.selector') element
                return $(this).attr('sideTitle');
            }
        },
        position: {
            target: 'mouse', // Track the mouse as the positioning target
            adjust: { x: 10, y: 15 } // Offset it slightly from under the mouse
        },
        style : {classes : 'qtip-bootstrap'}
    });

    $('#healthyGra,#fatGra').qtip({
        content: {
            text: function(event, api) {
                // Retrieve content from ALT attribute of the $('.selector') element
                return $(this).attr('foodText');
            },
            title: function(event, api) {
                // Retrieve content from ALT attribute of the $('.selector') element
                return $(this).attr('foodTitle');
            }
        },
        position: {
            target: 'mouse', // Track the mouse as the positioning target
            adjust: { x: 10, y: 15 } // Offset it slightly from under the mouse
        },
        style : {classes : 'qtip-bootstrap'}
    });


    $("#pointScotland").on('mouseover',function(){
        $("#imgScotland").css("display","block");
    }).on('mouseout',function(){
        $("#imgScotland").css("display","none");
    });
    $("#pointEngland").on('mouseover', function () {
        $("#imgEngland").css("display", "block");
    }).on('mouseout', function () {
        $("#imgEngland").css("display", "none");
    });
    $("#pointWales").on('mouseover', function () {
        $("#imgWales").css("display", "block");
    }).on('mouseout', function () {
        $("#imgWales").css("display", "none");
    });
    $("#pointIreland").on('mouseover', function () {
        $("#imgIreland").css("display", "block");
    }).on('mouseout', function () {
        $("#imgIreland").css("display", "none");
    });

})();