// var bar = document.querySelector('.side-bar .the-bar');
// var sideBar = document.querySelector('.side-bar');
// var body = document.body;
// var html = document.documentElement;

// function updateBar() {
//     var scrollHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
//     var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
//     var barMaxHeight = 50; // De maximale hoogte van de .bar in pixels
//     var sideBarHeight = sideBar.offsetHeight;
//     var barMaxHeightPercentage = (barMaxHeight / sideBarHeight) * 100;
//     var barHeight = (scrollPosition / (scrollHeight - window.innerHeight)) * 96.5;
//     if (barHeight > barMaxHeightPercentage) {
//         bar.style.height = barMaxHeightPercentage + '%';
//         bar.style.top = (barHeight - barMaxHeightPercentage) + '%';
//     } else {
//         bar.style.height = barHeight + '%';
//         bar.style.top = '0';
//     }
// }

// sideBar.addEventListener('click', function(e) {
//     var clickPosition = e.clientY - sideBar.getBoundingClientRect().top; // Get the relative click position
//     var sideBarHeight = sideBar.offsetHeight;
//     var scrollHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
//     var newScrollPosition = (clickPosition / sideBarHeight) * scrollHeight;
//     window.scroll({
//         top: Math.max(0, newScrollPosition), // Ensure the new scroll position is not less than 0
//         behavior: 'smooth'
//     });
// });

// window.addEventListener('scroll', updateBar);
// window.addEventListener('resize', updateBar);
// updateBar();

