class TailleHelper {
  constructor() {
    this.tourdetaille_cm = 0;
    this.longeur7emecervicaletailledos_cm = 0;
    this.hauteurtaillepointedesein_cm = 0;
    this.carruredos_cm = 0;
    this.tourdepoitrine_cm = 0;
    this.tourdeencolure_cm = 0;
    this.longeurdepaule_cm = 0;
    this.desantedepaule_cm = 0;
  }

  getEditorObject() {
    return {
      tourDeTaille: document.getElementById("touredetaille").value,
      longueur7emeCervicaleTailleDos: document.getElementById(
        "longeur7emecervicaletailledos_cm",
      ).value,
      hauteurTaillePointsDeSein: document.getElementById(
        "hauteurtaillepointedesein_cm",
      ).value,
      carrureDos: document.getElementById("carruredos_cm").value,
      tourDePoitrine: document.getElementById("tourdepoitriene_cm").value,
      tourDEncolure: document.getElementById("tourdeencolure_cm").value,
      longueurDEpaule: document.getElementById("longeurdepaule_cm").value,
      descenteDEpaule: document.getElementById("desantedepaule_cm").value,
    };
  }

  setTailles(
    tourdetaille_cm,
    longeur7emecervicaletailledos_cm,
    hauteurtaillepointedesein_cm,
    carruredos_cm,
    tourdepoitrine_cm,
    tourdeencolure_cm,
    longeurdepaule_cm,
    desantedepaule_cm,
  ) {
    this.tourdetaille_cm = parseFloat(tourdetaille_cm);
    this.longeur7emecervicaletailledos_cm = parseFloat(
      longeur7emecervicaletailledos_cm,
    );
    this.hauteurtaillepointedesein_cm = parseFloat(
      hauteurtaillepointedesein_cm,
    );
    this.carruredos_cm = parseFloat(carruredos_cm);
    this.tourdepoitrine_cm = parseFloat(tourdepoitrine_cm);
    this.tourdeencolure_cm = parseFloat(tourdeencolure_cm);
    this.longeurdepaule_cm = parseFloat(longeurdepaule_cm);
    this.desantedepaule_cm = parseFloat(desantedepaule_cm);

    document.getElementById("touredetaille").value = tourdetaille_cm;
    document.getElementById("longeur7emecervicaletailledos_cm").value =
      longeur7emecervicaletailledos_cm;
    document.getElementById("hauteurtaillepointedesein_cm").value =
      hauteurtaillepointedesein_cm;
    document.getElementById("carruredos_cm").value = carruredos_cm;
    document.getElementById("tourdepoitriene_cm").value = tourdepoitrine_cm;
    document.getElementById("tourdeencolure_cm").value = tourdeencolure_cm;
    document.getElementById("longeurdepaule_cm").value = longeurdepaule_cm;
    document.getElementById("desantedepaule_cm").value = desantedepaule_cm;
  }

  convertirEnPoints(cm) {
    return cm * 37.795275591;
  }

  appliquerTailles() {
    // Convertir les tailles de cm en points
    const tourdetaille_pt = this.convertirEnPoints(this.tourdetaille_cm);
    const longeur7emecervicaletailledos_pt = this.convertirEnPoints(
      this.longeur7emecervicaletailledos_cm,
    );
    const hauteurtaillepointedesein_pt = this.convertirEnPoints(
      this.hauteurtaillepointedesein_cm,
    );
    const carruredos_pt = this.convertirEnPoints(this.carruredos_cm);
    const tourdepoitrine_pt = this.convertirEnPoints(this.tourdepoitrine_cm);
    const tourdeencolure_pt = this.convertirEnPoints(this.tourdeencolure_cm);
    const longeurdepaule_pt = this.convertirEnPoints(this.longeurdepaule_cm);
    const desantedepaule_pt = this.convertirEnPoints(this.desantedepaule_cm);

    var longeurdepaule1_pt = longeurdepaule_pt + 37.795275591;

    // Modifier les attributs des lignes
    var ligneAB = document.querySelector("#ligneAB");
    ligneAB.setAttribute("x2", tourdetaille_pt / 4 + 1.5);

    var ligneAC = document.querySelector("#ligneAC");
    ligneAC.setAttribute("y2", 4493.8582677 - longeur7emecervicaletailledos_pt);
    ligneAC.setAttribute("y1", ligneAB.getAttribute("y1"));
    ligneAC.setAttribute("x1", ligneAB.getAttribute("x1"));
    ligneAC.setAttribute("x2", ligneAB.getAttribute("x1"));

    var ligneEM = document.querySelector("#ligneEM");
    ligneEM.setAttribute("x1", ligneAB.getAttribute("x1"));
    ligneEM.setAttribute("x2", tourdepoitrine_pt / 4 + 1.5);
    ligneEM.setAttribute("y1", 4493.8582677 - hauteurtaillepointedesein_pt);
    ligneEM.setAttribute("y2", 4493.8582677 - hauteurtaillepointedesein_pt);

    var ligneHTPB = document.querySelector("#ligneHTPB");
    ligneHTPB.setAttribute("y1", ligneEM.getAttribute("y2"));
    ligneHTPB.setAttribute("x1", ligneEM.getAttribute("x2"));
    ligneHTPB.setAttribute("y2", ligneAB.getAttribute("y2"));
    ligneHTPB.setAttribute("x2", ligneAB.getAttribute("x2"));

    var ligneLP = document.querySelector("#ligneLP");
    ligneLP.setAttribute(
      "y1",
      4493.8582677 - hauteurtaillepointedesein_pt - (carruredos_pt / 2 + 1),
    );
    ligneLP.setAttribute("x1", ligneAB.getAttribute("x1"));
    ligneLP.setAttribute(
      "y2",
      4493.8582677 - hauteurtaillepointedesein_pt - (carruredos_pt / 2 + 1),
    );
    ligneLP.setAttribute("x2", carruredos_pt / 2 + 1);

    var lignePEL = document.querySelector("#lignePEL");
    lignePEL.setAttribute("y1", ligneLP.getAttribute("y2"));
    lignePEL.setAttribute("x1", ligneLP.getAttribute("x2"));
    lignePEL.setAttribute("y2", 4493.8582677 - hauteurtaillepointedesein_pt);
    lignePEL.setAttribute("x2", ligneLP.getAttribute("x2"));

    var ligneCE = document.querySelector("#ligneCE");
    ligneCE.setAttribute("y1", ligneAC.getAttribute("y2"));
    ligneCE.setAttribute("x1", ligneAC.getAttribute("x2"));
    ligneCE.setAttribute("y2", ligneAC.getAttribute("y2"));
    ligneCE.setAttribute("x2", tourdeencolure_pt / 6 + 0.6);

    var ligneEF = document.querySelector("#ligneEF");
    ligneEF.setAttribute("y1", ligneCE.getAttribute("y2"));
    ligneEF.setAttribute("x1", ligneCE.getAttribute("x2"));
    ligneEF.setAttribute(
      "y2",
      4493.8582677 - longeur7emecervicaletailledos_pt - tourdeencolure_pt / 16,
    );
    ligneEF.setAttribute("x2", ligneCE.getAttribute("x2"));

    var ligneFG = document.querySelector("#ligneFG");
    ligneFG.setAttribute("y1", ligneEF.getAttribute("y2"));
    ligneFG.setAttribute(
      "x1",
      parseFloat(ligneEF.getAttribute("x2")) +
        Math.sqrt(longeurdepaule1_pt ** 2 - desantedepaule_pt ** 2),
    );
    ligneFG.setAttribute("y2", ligneEF.getAttribute("y2"));
    ligneFG.setAttribute("x2", ligneEF.getAttribute("x2"));

    var ligneGM = document.querySelector("#ligneGM");
    ligneGM.setAttribute("y1", ligneFG.getAttribute("y1"));
    ligneGM.setAttribute("x1", ligneFG.getAttribute("x1"));
    ligneGM.setAttribute(
      "y2",
      parseFloat(ligneFG.getAttribute("y1")) + desantedepaule_pt,
    );
    ligneGM.setAttribute("x2", ligneFG.getAttribute("x1"));

    var ligneFM = document.querySelector("#ligneFM");
    ligneFM.setAttribute("y1", ligneGM.getAttribute("y2"));
    ligneFM.setAttribute("x1", ligneGM.getAttribute("x2"));
    ligneFM.setAttribute("y2", ligneFG.getAttribute("y2"));
    ligneFM.setAttribute("x2", ligneFG.getAttribute("x2"));

    var ligneHE = document.querySelector("#ligneHE");
    var y1HE = parseFloat(ligneCE.getAttribute("y2"));
    var x1HE = parseFloat(ligneCE.getAttribute("x2"));
    ligneHE.setAttribute("y1", y1HE);
    ligneHE.setAttribute("x1", x1HE);

    // Convertir 1.5 cm en pixels
    var longueurEnCm = 1.5;
    var pixelsParCm = 37.8;
    var longueurEnPixels = longueurEnCm * pixelsParCm;

    // Convertir -135 degrés en radians
    var angleEnRadians = -135 * (Math.PI / 180);

    // Calculer les nouvelles coordonnées x2 et y2 avec -135 degrés
    var x2HE = x1HE + longueurEnPixels * Math.cos(angleEnRadians);
    var y2HE = y1HE + longueurEnPixels * Math.sin(angleEnRadians);
    ligneHE.setAttribute("x2", x2HE);
    ligneHE.setAttribute("y2", y2HE);

    var lignePE = document.querySelector("#lignePE");
    var y1PE = parseFloat(lignePEL.getAttribute("y2"));
    var x1PE = parseFloat(lignePEL.getAttribute("x2"));
    lignePE.setAttribute("y1", y1PE);
    lignePE.setAttribute("x1", x1PE);

    var longueurDivisee = tourdepoitrine_pt / 30;

    // Calculer x2 et y2 avec un angle de -45 degrés
    var angle = -45 * (Math.PI / 180); // Conversion de degrés en radians
    var x2PE = x1PE + longueurDivisee * Math.cos(angle);
    var y2PE = y1PE + longueurDivisee * Math.sin(angle);

    lignePE.setAttribute("y2", y2PE);
    lignePE.setAttribute("x2", x2PE);

    var Ax = parseFloat(ligneHTPB.getAttribute("x1"));
    var Ay = parseFloat(ligneHTPB.getAttribute("y1"));
    var Bx = parseFloat(lignePE.getAttribute("x2"));
    var By = parseFloat(lignePE.getAttribute("y2"));
    var Cx = parseFloat(ligneLP.getAttribute("x2"));
    var Cy = parseFloat(ligneLP.getAttribute("y2"));
    var Dx = parseFloat(ligneGM.getAttribute("x2"));
    var Dy = parseFloat(ligneGM.getAttribute("y2"));

    // Accéder aux éléments SVG par leur ID
    var curvePath = this.createCurveThroughPoints(
      Ax,
      Ay,
      Bx,
      By,
      Cx,
      Cy,
      Dx,
      Dy,
    );

    var courbeEmmanchure = document.getElementById("courbeEmmanchure");

    courbeEmmanchure.setAttribute("d", curvePath);
  }
  createCurveThroughPoints(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy) {
    // Fonction d'interpolation de spline cubique Catmull-Rom
    function interpolateCatmullRom(x0, y0, x1, y1, x2, y2, x3, y3, t) {
      var t2 = t * t;
      var t3 = t2 * t;

      var c0 = -0.5 * t3 + t2 - 0.5 * t;
      var c1 = 1.5 * t3 - 2.5 * t2 + 1.0;
      var c2 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
      var c3 = 0.5 * t3 - 0.5 * t2;

      var x = c0 * x0 + c1 * x1 + c2 * x2 + c3 * x3;
      var y = c0 * y0 + c1 * y1 + c2 * y2 + c3 * y3;

      return [x, y];
    }

    // Points de contrôle
    var points = [
      [Ax, Ay],
      [Bx, By],
      [Cx, Cy],
      [Dx, Dy],
    ];

    var curvePath = "";
    // Ajout du point de départ
    curvePath += "M" + Ax + " " + Ay;

    // Interpolation entre les points
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[i];
      var p1 = points[i + 1];

      for (var t = 0; t <= 1; t += 0.01) {
        // Ajustement de l'incrémentation pour une courbe plus lisse
        var interpolated = interpolateCatmullRom(
          points[Math.max(i - 1, 0)][0],
          points[Math.max(i - 1, 0)][1],
          p0[0],
          p0[1],
          p1[0],
          p1[1],
          points[Math.min(i + 2, points.length - 1)][0],
          points[Math.min(i + 2, points.length - 1)][1],
          t,
        );
        curvePath += " L" + interpolated[0] + " " + interpolated[1];
      }
    }

    return curvePath;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const editorString = urlParams.get("editor"); //Dans l'URL
const editorObject = JSON.parse(editorString);

const tailleHelper = new TailleHelper();
tailleHelper.setTailles(
  editorObject.tourDeTaille,
  editorObject.longueur7emeCervicaleTailleDos,
  editorObject.hauteurTaillePointsDeSein,
  editorObject.carrureDos,
  editorObject.tourDePoitrine,
  editorObject.tourDEncolure,
  editorObject.longueurDEpaule,
  editorObject.descenteDEpaule,
);
tailleHelper.appliquerTailles();

// Sélectionnez tous les éléments avec la classe "patronSlider"
const patronSliders = document.querySelectorAll(".patronSlider");

// Parcourez chaque élément et ajoutez un écouteur d'événements à chacun d'eux
patronSliders.forEach((patronSlider) => {
  patronSlider.addEventListener("input", () => {
    const editor = tailleHelper.getEditorObject();

    tailleHelper.setTailles(
      editor.tourDeTaille,
      editor.longueur7emeCervicaleTailleDos,
      editor.hauteurTaillePointsDeSein,
      editor.carrureDos,
      editor.tourDePoitrine,
      editor.tourDEncolure,
      editor.longueurDEpaule,
      editor.descenteDEpaule,
    );
    tailleHelper.appliquerTailles();
  });
});
