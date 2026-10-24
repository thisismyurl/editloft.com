/* Newsletter signup: posts the form to same-origin /api/subscribe and reports the result
   in the aria-live status line. No dependencies. Turnstile adds the hidden
   cf-turnstile-response field to the form on its own. */
(function () {
  'use strict';
  var form = document.querySelector('[data-newsletter-form]');
  if (!form) return;

  // Same-origin /api/subscribe by default. A site whose own hostname cannot run Workers (thisismyurl.com)
  // sets data-endpoint to its helper host, e.g. https://signup.thisismyurl.com/api/subscribe.
  var endpoint = form.getAttribute('data-endpoint') || '/api/subscribe';
  var opened = Date.now(); // the Worker refuses submissions faster than a person could type
  var status = form.querySelector('.nl-status[role="status"]');
  var button = form.querySelector('button[type="submit"]');

  var MESSAGES = {
    invalid_email: 'That email address does not look right. Please check it and try again.',
    turnstile_failed: 'We could not confirm you are a person. Please try the check again.',
    too_fast: 'That was quick. Please wait a moment and try again.',
    rate_limited: 'Too many attempts from your connection. Please try again later.',
    generic: 'Something went wrong on our side. Please try again in a moment.'
  };

  function say(text, isError) {
    status.textContent = text;
    status.classList.toggle('nl-status--error', !!isError);
    status.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var email = String(data.get('email') || '').trim();
    if (!email) {
      say('Please enter your email address.', true);
      form.elements.email.focus();
      return;
    }
    button.disabled = true;
    say('Sending…', false);

    fetch(endpoint, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: email,
        'cf-turnstile-response': data.get('cf-turnstile-response'),
        consent_v: data.get('consent_v'),
        subscribe_extra_field: data.get('subscribe_extra_field'),
        t0: opened,
        source_url: location.href
      })
    })
      .then(function (res) {
        return res.json().then(function (body) { return { ok: res.ok, body: body }; });
      })
      .then(function (result) {
        if (result.ok && result.body.ok) {
          form.reset();
          say('Thank you. You are on the list.', false);
        } else {
          say(MESSAGES[result.body && result.body.error] || MESSAGES.generic, true);
          if (window.turnstile) window.turnstile.reset();
        }
      })
      .catch(function () {
        say(MESSAGES.generic, true);
        if (window.turnstile) window.turnstile.reset();
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
