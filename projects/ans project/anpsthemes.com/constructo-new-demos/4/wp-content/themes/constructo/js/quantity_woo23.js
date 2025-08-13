
jQuery(function($) {
    var quantityInput = $('.quantity > input.qty')
    if (!quantityInput.length) return
    if (!quantityInput.siblings('.plus').length) {
        quantityInput.after('<input type="button" value="+" class="plus"><input type="button" value="-" class="minus">')
    }

    $( document).on( 'click', '.plus, .minus', function() {
        var $el = $(this)

        // Get values
        var $qty        = $el.closest('.quantity').find('.qty')
        var currentVal  = Number.parseFloat($qty.val())
        var max         = Number.parseFloat($qty.attr('max'))
        var min         = Number.parseFloat($qty.attr('min'))
        var step        = $qty.attr('step')

        // Format values
        if (Number.isNaN(currentVal) || currentVal <= 0) currentVal = 0
        if (Number.isNaN(max) || !max) max = null
        if (Number.isNaN(min) || !min) min = 0
        step = step === 'any' ? 1 : Number.parseFloat(step)
        if (Number.isNaN(step) || !step) step = 1

        // Change the value
        if ($el.is('.plus')) {
            if (max && (max === currentVal || currentVal > max)) {
                $qty.val(max)
            } else {
                $qty.val(currentVal + step)
            }
        } else {
            if (min === currentVal || currentVal < min) {
                $qty.val(min)
            } else if (currentVal > 0) {
                $qty.val(currentVal - step)
            }
        }

        $qty.trigger('change')
    })
})
