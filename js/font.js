(function(d) {
  var config = {
    kitId: 'omu2jir',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

  var text = document.querySelector('.hero-text');

  function blink() {
    text.style.textShadow = 'none';
    // text.style.fontWeight = '100';
    setTimeout(function() {
      text.style.textShadow = '0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 30px #ffffff, 0 0 40px #ffffff, 0 0 50px #ffffff, 0 0 60px #ffffff';
      // text.style.fontWeight = '900';
    }, 100);
  }

  for (var i = 0; i < 7; i++) {
    setTimeout(blink, Math.random() * 2000);
  }

  document.querySelector('.sky-img').addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });