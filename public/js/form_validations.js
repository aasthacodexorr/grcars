const ALLOWED_IFRAME_ORIGIN = "https://gediroute.zopsoftware.com";

$( document ).ready(function() {

    function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    alert = Swal.mixin({
        showConfirmButton: false,
        timerProgressBar: true,
        confirmButtonText: "",
        title: "Sending your message...",
        onBeforeOpen: () => {
            alert.showLoading();
        },
    });
    
    window.addEventListener("message", function(event) {

		if (typeof global_properties != "undefined") {
            if (event.origin !== ALLOWED_IFRAME_ORIGIN) {
                return;
            }
        }

        switch (event.data) {
            case 'alertFire':
                alert.fire();
                console.log('alertFire');
                break;
            case 'alertSuccessUpdate':
                console.log('alertSuccessUpdate');
                 alert.update({
                    title: 'Thank You! \n Your message has been sent.',
                    icon: "success",
                }); 
                break;
            case 'redirectToThankYouPage':
                console.log('redirectToThankYouPage');
                window.location.href = window.location.origin + '/thank-you';
                break;
				
			case 'redirectToInventoryListing':
                console.log('redirectToInventoryListing');
                window.location.href = window.location.origin + '/inventory';
                break;
				
            case 'alertErrorUpdate':
                console.log('alertErrorUpdate');
                alert.update({
                    title: 'There were errors in submitting the form.',
                    icon: "error",
                });
                break;
            case 'alertClose':
                console.log('alertClose');
                wait(1500);
                alert.close();
                break;
            case 'singleCreditApplicationHeight':
                console.log('singleCreditApplicationHeight')
                break;
            default:
                break;
        }

        if(event.data.hasOwnProperty("type")){
			console.log(event);
            if(event.data.type == "css"){
                $(`#${event.data.element_id}`).css("min-height", parseInt(event.data.value) + 80);
            }
        }

         
    });


});