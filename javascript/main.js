//main text//
document.getElementById("maintext").innerHTML = "Ik ben Guus, een ambitieuze en hardwerkende jongen die momenteel op school de X11 zit.<br>Naast mijn studie, werk ik al meer dan een half jaar bij Dirk van den Broek, waar ik heb geleerd hoe ik moet omgaan met verschillende uitdagingen en taken.<br>Ik ben altijd op zoek naar manieren om mezelf te verbeteren en te groeien.<br><br>Mijn passie voor technologie en het web heeft me geleid tot het begin van mijn reis in webflow.<br>Ik heb veel geleerd over hoe websites werken en hoe ze eruit kunnen zien, maar uiteindelijk besloot ik zelf te leren codeeren.<br>Ik was verbaasd over hoe snel ik HTML en CSS kon leren. Ik heb HTML in slechts 2 dagen geleerd en CSS in 1 dag. Dit gaf me de motivatie om door te gaan en me te verdiepen in andere programmeertalen.<br><br>Ik ben vastbesloten om mijn kennis en vaardigheden verder uit te breiden en mijn doel is om een succesvolle webdeveloper te worden.<br>Ik ben altijd op zoek naar nieuwe uitdagingen en kansen om mezelf te bewijzen en te groeien.<br>Ik geloof sterk in hard werken en het nastreven van mijn dromen en ambities.";
let userAgent = navigator.userAgent;
if (userAgent.match(/iPhone/i)) {
    let css = '@media screen and (display-mode: standalone) and (max-width: 1600px) { .nav { padding-top: 130px; } .navdiv1 { padding-top: 130px; } .top { margin-top: 230px; } .box { margin-top: 230px; } .card-main { margin-top: 230px; } }'; // Je specifieke CSS-regels
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}





