var answers = ["ass", "kevin", "witch"]
var delay = 400;

function showChallenge(challengeId) {
    $("#challenge" + (challengeId - 1)).fadeOut(400, function() {
        $("#challenge" + challengeId).fadeIn(400, function(){
            if(challengeId === 2)
            {
                document.getElementById("witchVideo").play();
            }
            else if(challengeId===3)
            {
                document.getElementById("witchVideo").pause();
                document.getElementById("congrats").play();
            }
        });
    });
}

function answerChallenge(challengeId) {
    var $val = $("#challenge"+challengeId+" input:checked").val();

    if(challengeId===2)
    {
        $val = $("#challenge"+challengeId+" input").val();
    }
    
    if($val && $val.toLowerCase() === answers[challengeId])
    {
        showChallenge(challengeId + 1);
    }
    else {
        alert("Incorrect!");
    }
}

var JsonFormatter = {
    stringify: function (cipherParams) {
        // create json object with ciphertext
        var jsonObj = {
            ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
        };

        // optionally add iv and salt
        if (cipherParams.iv) {
            jsonObj.iv = cipherParams.iv.toString();
        }
        if (cipherParams.salt) {
            jsonObj.s = cipherParams.salt.toString();
        }

        // stringify json object
        return JSON.stringify(jsonObj);
    },

    parse: function (jsonStr) {
        // parse json string
        var jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });

        // optionally extract iv and salt
        if (jsonObj.iv) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
        }
        if (jsonObj.s) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
        }

        return cipherParams;
    }
};

var prize = "INSERT KEY HERE"

function showPrize() {
    var key = $("#fullName").val();
    key = key.replace(/\s/g, '').toUpperCase();

    try
    {
        var decrypted=CryptoJS.AES.decrypt(prize, key).toString(CryptoJS.enc.Utf8);
        var obj = JSON.parse(decrypted);

        $("#account").text(obj.num);
        $("#access").text(obj.access);
        $("#amount").text(obj.amount);
        $("#event").text(obj.event);
        
        $("#entry").fadeOut(400, function() {
            $("#prize").fadeIn();
        });
    }
    catch(err) {
        alert("Incorrect!");
        return;
    }
}
