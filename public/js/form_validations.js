const ALLOWED_IFRAME_ORIGIN = "https://gediroute.zopsoftware.com";

$(document).ready(function () {

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

    window.addEventListener("message", function (event) {

        // Allow messages only from the trusted iframe origin
        if (event.origin !== ALLOWED_IFRAME_ORIGIN) {
            return;
        }

        switch (event.data) {

            case "alertFire":
                alert.fire();
                console.log("alertFire");
                break;

            case "alertSuccessUpdate":
                console.log("alertSuccessUpdate");

                alert.update({
                    title: "Thank You! \n Your message has been sent.",
                    icon: "success",
                });
                break;

            case "redirectToThankYouPage":
                console.log("redirectToThankYouPage");
                window.location.href =
                    window.location.origin + "/thank-you";
                break;

            case "redirectToInventoryListing":
                console.log("redirectToInventoryListing");
                window.location.href =
                    window.location.origin + "/inventory";
                break;

            case "alertErrorUpdate":
                console.log("alertErrorUpdate");

                alert.update({
                    title: "There were errors in submitting the form.",
                    icon: "error",
                });
                break;

            case "alertClose":
                console.log("alertClose");
                wait(1500);
                alert.close();
                break;

            case "singleCreditApplicationHeight":
                console.log("singleCreditApplicationHeight");
                break;

            default:
                break;
        }

        if (
            event.data &&
            typeof event.data === "object" &&
            event.data.hasOwnProperty("type")
        ) {
            console.log(event);

            if (event.data.type === "css") {
                $(`#${event.data.element_id}`).css(
                    "min-height",
                    parseInt(event.data.value) + 80
                );
            }
        }
    });
});


/*
 * ------------------------------------------------------------
 * Forward parent page query parameters to ZopSoftware iframes
 * ------------------------------------------------------------
 *
 * Only iframes whose hostname is zopsoftware.com or a subdomain
 * (e.g. cardora.zopsoftware.com) are modified.
 * Unrelated iframes (YouTube, Google, payment providers, etc.)
 * are never touched.
 *
 * Handles:
 * 1. Iframes already present when the script loads.
 * 2. Iframes added later by React / Next.js (MutationObserver).
 * 3. Iframes whose src attribute changes after being added.
 *
 * Infinite-loop guard: the observer only calls updateIframe when
 * the final URL is actually different from the current src, so
 * self-triggered attribute mutations are ignored.
 */

(function () {

    /**
     * Returns true when the URL belongs to zopsoftware.com or a subdomain.
     * Uses strict hostname comparison — never a loose string-include check.
     */
    function isZopSoftwareUrl(url) {
        try {
            var hostname = new URL(url).hostname;
            return (
                hostname === "zopsoftware.com" ||
                hostname.endsWith(".zopsoftware.com")
            );
        } catch (e) {
            return false;
        }
    }

    /**
     * Reads ALL current page query parameters generically.
     * Does not hardcode any parameter name.
     */
    function getQueryParams() {
        return new URLSearchParams(window.location.search);
    }

    /**
     * Applies current page query parameters to a URL string.
     * Uses set() so page params are the source of truth for
     * duplicate keys, while unrelated iframe params are preserved.
     *
     * Returns the final URL string, or null if no change is needed.
     */
    function buildUpdatedSrc(iframeSrc) {
        if (!iframeSrc || !isZopSoftwareUrl(iframeSrc)) {
            return null;
        }

        var search = window.location.search;
        if (!search) {
            return null;
        }

        var rawSearch = search.startsWith("?") ? search.slice(1) : search;
        if (!rawSearch) {
            return null;
        }

        var hashIndex = iframeSrc.indexOf("#");
        var hash = "";
        var withoutHash = iframeSrc;
        if (hashIndex !== -1) {
            hash = iframeSrc.slice(hashIndex);
            withoutHash = iframeSrc.slice(0, hashIndex);
        }

        var queryIndex = withoutHash.indexOf("?");
        var basePath = withoutHash;
        var existingQuery = "";
        if (queryIndex !== -1) {
            basePath = withoutHash.slice(0, queryIndex);
            existingQuery = withoutHash.slice(queryIndex + 1);
        }

        var params = new Map();

        if (existingQuery) {
            existingQuery.split("&").forEach(function (part) {
                if (!part) return;
                var eqIdx = part.indexOf("=");
                if (eqIdx === -1) {
                    params.set(part, { value: "", hasEqual: false });
                } else {
                    var key = part.slice(0, eqIdx);
                    var val = part.slice(eqIdx + 1);
                    params.set(key, { value: val, hasEqual: true });
                }
            });
        }

        rawSearch.split("&").forEach(function (part) {
            if (!part) return;
            var eqIdx = part.indexOf("=");
            if (eqIdx === -1) {
                if (!params.has(part)) {
                    params.set(part, { value: "", hasEqual: false });
                }
            } else {
                var key = part.slice(0, eqIdx);
                var val = part.slice(eqIdx + 1);
                params.set(key, { value: val, hasEqual: true });
            }
        });

        var queryParts = [];
        params.forEach(function (meta, key) {
            if (meta.hasEqual) {
                queryParts.push(key + "=" + meta.value);
            } else {
                queryParts.push(key);
            }
        });

        var finalQuery = queryParts.length ? "?" + queryParts.join("&") : "";
        var newUrl = basePath + finalQuery + hash;
        return newUrl !== iframeSrc ? newUrl : null;
    }

    /**
     * Updates a single iframe's src if it points to ZopSoftware
     * and the final URL would differ from the current src.
     *
     * Infinite-loop guard: the assignment only happens when the
     * computed final URL differs from iframe.src, so the
     * MutationObserver's own src-attribute change is ignored on
     * the next callback because buildUpdatedSrc returns null.
     */
    function updateIframe(iframe) {
        if (!iframe) {
            return;
        }

        var iframeSrc = iframe.getAttribute("src");

        if (!iframeSrc) {
            return;
        }

        var newSrc = buildUpdatedSrc(iframeSrc);

        if (newSrc && newSrc !== iframe.src) {
            iframe.src = newSrc;
        }
    }

    function processExistingIframes() {
        document.querySelectorAll("iframe").forEach(function (iframe) {
            updateIframe(iframe);
        });
    }

    function initIframeQueryParams() {
        /*
         * A. Process iframes that already exist.
         */
        processExistingIframes();

        /*
         * B. Watch for iframes React / Next.js adds later, and
         *    for src attribute changes on existing iframes.
         */
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {

                /*
                 * C. src attribute changed on an existing iframe.
                 *    This covers React rendering the iframe src
                 *    after the element is already in the DOM.
                 */
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "src" &&
                    mutation.target.tagName === "IFRAME"
                ) {
                    updateIframe(mutation.target);
                    return;
                }

                /*
                 * D. New nodes added to the DOM.
                 */
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }

                    /* The added node itself is an iframe. */
                    if (node.tagName === "IFRAME") {
                        updateIframe(node);
                    }

                    /* The added node contains one or more iframes. */
                    if (node.querySelectorAll) {
                        node.querySelectorAll("iframe").forEach(function (iframe) {
                            updateIframe(iframe);
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["src"],
        });
    }

    /*
     * If DOM is still loading, wait for it.
     * Otherwise initialize immediately.
     */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initIframeQueryParams);
    } else {
        initIframeQueryParams();
    }

})();