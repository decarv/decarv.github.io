

// Problema: A função recebe um hash, não uma string. Eu quero então pegar minha
// string e passar pelo hash e só depois criar o objeto.

function regenAnimation() {
    let hash = $('#hashInputText').val();
    let salt = $('#hashSaltText').val();

    // let anim = hashify.seed(hash, salt);
    // anim.prepAnimation("#svgDiv", [1, 4], [2, 2], { ...DEFAULT_OPTS, x: -175, y: 50 });

    var hashalg = "SHA-256";
    var modifyGeneratorElement = $("#chkChangeGenerator").prop('checked');
    var elementToModify = parseInt($("#optnumberToChange").val());
    var modified_sha_gen = function* () {
        var saltHasher = new jsSHA(
            hashalg,
            "TEXT"
        );
        saltHasher.update(salt);
        var saltHex = saltHasher.getHash("HEX");

        var hashObj = new jsSHA(
            hashalg,
            "TEXT"
        );

        var i = 0;
        // we set the initial state
        //hashObj.update(hash);
        var current_state = hash;
        while (true) {
            var hashObj = new jsSHA(
                hashalg,
                "TEXT"
            );
            hashObj.update(current_state + saltHex);
            current_state = hashObj.getHash("HEX");

            // HAC: não entendi isso daqui.
            // elementToModify só está alterando para o primeiro bit?
            i++;
            //console.log("elementToModify = " + elementToModify);
            //console.log("i = " + i);
            //console.log(current_state);
            if (modifyGeneratorElement && i == elementToModify) {
                yield Add(BigInt("0x" + current_state), BigInt(1));
                console.log("Modified element n. " + i);
                console.log(BigInt("0x" + current_state));
                console.log(Add(BigInt("0x" + current_state), BigInt(1)));
            }
            else {
                yield BigInt("0x" + current_state);
            }

        }
    }
    let anim2 = new hashify(modified_sha_gen);
    let anim2Masks = {
        ...DEFAULT_OPTS.masks,
        animate: $("#optAnimate").prop('checked'),
        thinLine: $("#optThinLine").prop('checked'),
        movingLine: $("#optMovingLine").prop('checked')
    };
    anim2.prepAnimation("#maskedSvgDiv", [1, 4], [2, 2],
        { ...DEFAULT_OPTS, x: 175, y: 50, masks: anim2Masks });

    // here we add both timelines to the same timeline (instead of playing them directly)
    //so they are synchronized
    var t = new mojs.Timeline();
    //t.add(anim.timeline);
    t.add(anim2.timeline);
    t.play();
}

$("#optAnimate").prop("checked", true);
$("#optThinLine").prop("checked", true);
$("#optMovingLine").prop("checked", true);

$("#optnumberToChange").val("0");
$("#optnumberToChange").prop('disabled', true);

function onChangeGenerator() {
    if ($("#chkChangeGenerator").prop('checked')) {
        $("#optnumberToChange").prop('disabled', false);
    }
    else {
        $("#optnumberToChange").prop('disabled', true);
    }

    regenAnimation();
}

// Setting up the js events

let input = document.querySelector('input');
input.addEventListener('input', regenAnimation);

$("#optAnimate").change(regenAnimation);
$("#optThinLine").change(regenAnimation);
$("#optMovingLine").change(regenAnimation);
$("#updateAnimation").click(regenAnimation);

$("#chkChangeGenerator").change(onChangeGenerator);
$("#optnumberToChange").change(regenAnimation);

$('#hashInputText').val("a78e3f").change();
