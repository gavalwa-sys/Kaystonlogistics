(function($){"use strict";$(function(){setTimeout(function(){$('#spinner').removeClass('show')},200);if($('.header-carousel').length){$('.header-carousel').owlCarousel({items:1,autoplay:true,autoplayTimeout:6000,smartSpeed:1000,loop:true,dots:true,nav:false});}$(window).on('scroll',function(){if($(this).scrollTop()>250){$('.back-to-top').fadeIn();}else{$('.back-to-top').fadeOut();}});$('.back-to-top').on('click',function(e){e.preventDefault();$('html,body').animate({scrollTop:0},600);});});})(jQuery);

// Destination finder on the home page
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('destinationSearch');
  const results = document.getElementById('destinationResults');
  const count = document.getElementById('destinationCount');
  const clear = document.getElementById('clearDestinationSearch');
  if (!input || !results) return;

  const sourceItems = Array.from(document.querySelectorAll('.country-grid span, .city-grid span, .route-cloud .route-chip'));
  const destinations = [...new Set(sourceItems.map(el => el.textContent.trim()).filter(Boolean))].map(name => ({
    name,
    type: sourceItems.find(el => el.textContent.trim() === name)?.closest('.city-grid') ? 'City' :
          sourceItems.find(el => el.textContent.trim() === name)?.closest('.country-grid') ? 'Country' : 'Route'
  }));

  function render(query) {
    const q = query.trim().toLowerCase();
    clear.style.display = q ? 'block' : 'none';
    const matches = (q ? destinations.filter(d => d.name.toLowerCase().includes(q)) : destinations).slice(0, 40);
    results.innerHTML = '';
    if (!q) {
      count.textContent = destinations.length + ' destinations available';
    } else if (!matches.length) {
      count.textContent = 'No matching destination found';
      results.innerHTML = '<div class="destination-empty"><i class="fa fa-route me-2"></i>We can still check your route. <a href="quote.html">Request a transport quote</a>.</div>';
      return;
    } else {
      count.textContent = matches.length + ' matching destination' + (matches.length === 1 ? '' : 's');
    }
    matches.forEach(d => {
      const a = document.createElement('a');
      a.className = 'destination-result';
      a.href = 'quote.html?destination=' + encodeURIComponent(d.name);
      a.innerHTML = '<i class="fa fa-map-marker-alt"></i>' + d.name + ' <small>(' + d.type + ')</small>';
      results.appendChild(a);
    });
  }

  input.addEventListener('input', () => render(input.value));
  clear.addEventListener('click', () => { input.value = ''; input.focus(); render(''); });
  render('');
});
