$(document).ready(function() {
     var icon = function($icon, $class, $id) {
         if ($id) {
             $id = ' id="'+$id+'"';
         } else {
             $id = '';
         }

         return '<svg'+ $id + ' class="ml-5 icon icon-' + $icon + ' ' + $class +'"><use xlink:href="symbol-defs.svg#icon-'+$icon+'"></use></svg>'
     };

     // $("#toc-toggle").click(function() {
     //     $("nav.toc").toggleClass("active")
     // });

     // $(".close-toc").click(function() {
     //     $("nav.toc").removeClass("active")
     // });

    // $("nav.toc").on("click", "svg.expand-toc",
     //        function() {
     //            $(this).siblings("ul").slideToggle('fast');

     //            if ($(this).attr('class') == 'icon icon-cross expand-toc') {
     //              $(this).replaceWith(icon('plus', 'expand-toc'));
     //            } else {
     //              $(this).replaceWith(icon('cross', 'expand-toc'));
     //            };

     //        })


    // Table of contents

    $("#contentrow").hide();

    $("#headcontent").click(
           function() {
               $("#contentrow").slideToggle();
           })

    // subsections
    
    $("h2.subsection-header").click(
        function () {
            var target_id = $(this).attr("id") + "-content";
            $(`[id="${target_id}"]`).slideToggle();
            // (do not use '#' notation for id here since the id of
            // $(this) may contain a colon which is (mis-)interpreted
            // by jQuery
        });

    // proofs

    $("div.proof_content p:last-child").append('<span class="qed">□</span>');
    $("div.proof_heading").each(
        function() {
            // HTML5 jinja2 templates put plus icon next to proof (and hide proof),
            // but we show the proofs and hence replace the plus by the cross icon
            var expand_icon = $(this).children('svg.expand-proof');
            expand_icon.replaceWith(icon('cross', 'expand-proof'));
        }
    );

    $("div.proof_heading").click(
           function() {
               var expand_icon = $(this).children('svg.expand-proof');
               if (expand_icon.attr('class') == 'icon icon-cross expand-proof') {
                   expand_icon.replaceWith(icon('plus', 'expand-proof'));
               } else {
                   expand_icon.replaceWith(icon('cross', 'expand-proof'));
               };

               $(this).siblings("div.proof_content").slideToggle()
           });

    $("a.proof").click(
            function() {
                var ref= $(this).attr('href').split('#')[1];
                var proof = $('#'+ref)
                proof.show()
                proof.children('.proof_content').each(
                    function() { 
                        var proof_content = $(this)
                        proof_content.show().addClass('hilite')
                        setTimeout(function(){
                            proof_content.removeClass('hilite')
                            }, 1000);
                    })
                var expand_icon = proof.find('svg.expand-proof');
                expand_icon.replaceWith(icon('cross', 'expand-proof'));
            });

    // optbemerkung

    $("div.optbemerkung_thmheading").each(
        function() {
            // HTML5 jinja2 templates put plus icon next to proof (and hide proof),
            // but we show the proofs and hence replace the plus by the cross icon
            var expand_icon = $(this).append('<svg class="icon icon-plus expand-proof"><use xlink:href="symbol-defs.svg#icon-plus"></use></svg>');
        }
    );

    $("div.optbemerkung_thmheading").click(
           function() {
               var expand_icon = $(this).children('svg.expand-proof');
               if (expand_icon.attr('class') == 'icon icon-cross expand-proof') {
                   expand_icon.replaceWith(icon('plus', 'expand-proof'));
               } else {
                   expand_icon.replaceWith(icon('cross', 'expand-proof'));
               };

               $(this).siblings("div.optbemerkung_thmcontent").slideToggle()
           });

    // top right nav buttons

    function subsection_show() {
        $("h2.subsection-header").each(
            function () {
                var target_id = $(this).attr("id") + "-content";
                $(`[id="${target_id}"]`).show();
            });
    }

    function subsection_hide() {
        $("h2.subsection-header").each(
            function () {
                var target_id = $(this).attr("id") + "-content";
                $(`[id="${target_id}"]`).hide();
            });
    }

    function proof_show() {
        $("div.proof_heading").each(
            function() {
                var expand_icon = $(this).children('svg.expand-proof');
                expand_icon.replaceWith(icon('cross', 'expand-proof'));
                $(this).siblings("div.proof_content").show()
            })
    }

    function proof_hide() {
        $("div.proof_heading").each(
            function() {
                var expand_icon = $(this).children('svg.expand-proof');
                expand_icon.replaceWith(icon('plus', 'expand-proof'));
                $(this).siblings("div.proof_content").hide()
            })
    }

    function optbemerkung_show() {
        $("div.optbemerkung_thmheading").each(
            function() {
                var expand_icon = $(this).children('svg.expand-proof');
                expand_icon.replaceWith(icon('cross', 'expand-proof'));
                $(this).siblings("div.optbemerkung_thmcontent").show()
            })
    }

    function optbemerkung_hide() {
        $("div.optbemerkung_thmheading").each(
            function() {
                var expand_icon = $(this).children('svg.expand-proof');
                expand_icon.replaceWith(icon('plus', 'expand-proof'));
                $(this).siblings("div.optbemerkung_thmcontent").hide()
            })
    }

    $('#btn-show-all').click(
        function() {
            subsection_show();
            proof_show();
            optbemerkung_show();
        });

    $('#btn-show-normal').click(
        function() {
            subsection_show();
            proof_show();
            optbemerkung_hide();
        });

    $('#btn-show-gist').click(
        function() {
            subsection_show();
            proof_hide();
            optbemerkung_hide();
        });

    $('#btn-show-overview').click(
        function() {
            subsection_hide();
            proof_show();
            optbemerkung_hide();
        });

    $('#btn-show-none').click(
        function() {
            subsection_hide();
            proof_hide();
            optbemerkung_hide();
        });

    // what is the below good for?

    $("button.modal").click(
        function() {
          $(this).next("div.modal-container").css('display', 'flex');
        });
    $("button.closebtn").click(
        function() {
          $(this).parent().parent().parent().hide();
        });
});
