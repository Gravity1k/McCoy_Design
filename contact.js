
$(document).ready(function () {
    var current_fs, next_fs, previous_fs; // fieldsets
    var left, opacity, scale; // fieldset properties which we will animate
    var animating; // flag to prevent quick multi-click glitches

    $(".next").click(function () {
        if (animating) return false;

        // Move the definition here
        current_fs = $(this).parent();

        var isValid = validateCurrentFieldset(current_fs);

        if (!isValid) {
            return false;
        }

        animating = true;
        next_fs = $(this).parent().next();

        $("#progressbar li")
            .eq($("fieldset").index(next_fs))
            .addClass("active");

        next_fs.show();
        current_fs.animate(
            { opacity: 0 },
            {
                step: function (now, mx) {
                    scale = 1 - (1 - now) * 0.2;
                    left = now * 50 + "%";
                    opacity = 1 - now;
                    current_fs.css({
                        transform: "scale(" + scale + ")",
                        position: "absolute",
                    });
                    next_fs.css({ left: left, opacity: opacity });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: "easeInOutBack",
            }
        );
    });

    

    function validateCurrentFieldset(current_fs) {
        var currentFieldset = current_fs.find("input[required]");

        for (var i = 0; i < currentFieldset.length; i++) {
            if ($(currentFieldset[i]).val() === "") {
                alert("Please fill out all required fields.");
                return false;
            }
        }

        return true;
    }

    $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        $("#progressbar li")
            .eq($("fieldset").index(current_fs))
            .removeClass("active");

        previous_fs.show();
        current_fs.animate(
            { opacity: 0 },
            {
                step: function (now, mx) {
                    scale = 0.8 + (1 - now) * 0.2;
                    left = (1 - now) * 50 + "%";
                    opacity = 1 - now;
                    current_fs.css({ left: left });
                    previous_fs.css({
                        transform: "scale(" + scale + ")",
                        opacity: opacity,
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                easing: "easeInOutBack",
            }
        );
    });
    
});


