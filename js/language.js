(function () {
  const translations = {
    "Photography": "Fotografie", "Selected": "Selecție", "Photo Journal": "Jurnal foto", "Street": "Stradă", "Landscape": "Peisaj",
    "Events": "Evenimente", "People": "Oameni", "Nature & Wildlife": "Natură și faună sălbatică",
    "Still Life": "Natură statică", "Short Films": "Scurtmetraje", "Awards": "Premii", "Prints": "Printuri",
    "Contact": "Contact", "Selected work": "Lucrări selectate", "Photographs": "Fotografii",
    "A small collection of places, people, and passing moments. Browse by subject to find a slower, more focused view.": "O selecție de locuri, oameni și momente trecătoare. Explorează fotografiile pe categorii și privește lumea în ritmul ei.",
    "Photography / Collection": "Fotografie / Colecție", "Small gestures, passing faces, and the rhythm between destinations.": "Gesturi discrete, chipuri trecătoare și ritmul dintre destinații.",
    "Open air, distant horizons, and quiet places shaped by light.": "Orizonturi îndepărtate, spații deschise și locuri liniștite modelate de lumină.",
    "Live music, shared celebrations, and moments that unfold in a crowd.": "Muzică live, sărbători împărtășite și momente surprinse în mijlocul mulțimii.",
    "Portraits and encounters, made with attention to character and light.": "Portrete și întâlniri surprinse cu atenție la caracter și lumină.",
    "Animals, birds, and small details from the natural world.": "Animale, păsări și detalii discrete din lumea naturală.",
    "Carefully observed objects, flowers, and studies in light.": "Obiecte și flori observate cu atenție, în jocuri de lumină.",
    "A life, seen through a lens": "O viață privită prin obiectiv", "Photographer": "Fotograf",
    "Alex is a passionate photographer who constantly looks forward to exploring the world and its mysteries. As a travel enthusiast, he loves documenting his own life through the art of photography, however, he is also considering pursuing cinematography in the years to come.": "Alex este un fotograf pasionat, mereu dornic să exploreze lumea și misterele ei. Fiind pasionat de călătorii, îi place să-și documenteze propria viață prin arta fotografiei; de asemenea, ia în considerare să studieze cinematografia în anii următori.",
    "Instagram": "Instagram", "Email": "E-mail", "View my work": "Vezi fotografiile mele",
    "Moving images": "Imagini în mișcare", "A few stories in motion—small worlds, passing moments, and places seen a little differently.": "Câteva povești în mișcare: lumi mici, momente trecătoare și locuri privite altfel.",
    "Watch on YouTube": "Urmărește pe YouTube", "01 / SHORT FILM": "01 / SCURTMETRAJ", "02 / SHORT FILM": "02 / SCURTMETRAJ", "03 / CINEMATIC VIDEO": "03 / VIDEO CINEMATOGRAFIC",
    "FEATURED VIDEO · SHOWREEL": "VIDEO REPREZENTATIV · SHOWREEL", "Selected moving images": "Selecție de imagini în mișcare", "A Day in Bucharest": "O zi în București",
    "Awards": "Premii", "Selected prizes and recognitions.": "Premii și distincții selectate.", "International": "Internaționale", "National": "Naționale",
    "View the official result ↗": "Vezi rezultatul oficial ↗", "Directed & edited": "Regie și montaj",
    "Watch on YouTube ↗": "Urmărește pe YouTube ↗",
    "BOOVIE · BOOK TRAILER": "BOOVIE · TRAILER DE CARTE",
    "Lady Tan’s Circle of Women": "Doamna Tan și cercul binelui",
    "Planning an event?": "Organizezi un eveniment?",
    "From the atmosphere of the day to the moments you’ll want to remember, I’d love to photograph or film your event. Tell me what you’re planning and we can make something meaningful together.": "De la atmosfera evenimentului până la momentele pe care vrei să le păstrezi, mi-ar plăcea să fotografiez sau să filmez evenimentul tău. Povestește-mi ce planifici și vom crea împreună ceva memorabil.",
    "Let’s talk about your event": "Hai să vorbim despre evenimentul tău",
    "Call me": "Sună-mă",
    "View the official finalists ↗": "Vezi lista oficială a finaliștilor ↗", "Watch the film ↗": "Vezi scurtmetrajul ↗",
    "Browse photography categories": "Explorează categoriile fotografice", "Selected photographs": "Fotografii selectate",
    "Color": "Culoare", "B&W": "Alb-negru", "A tighter edit of the photographs that best represent my work.": "O selecție restrânsă de fotografii care reprezintă cel mai bine munca mea.",
    "1st Prize · Pocket Trailer": "Premiul I · Pocket Trailer",
    "2025": "2025", "2026": "2026", "$20": "20 $", "$25": "25 $", "Special Prize": "Premiu special", "1st Prize": "Premiul I",
    "3rd Prize": "Premiul III", "Top 20 Award": "Premiul Top 20", "Top 50 Award": "Premiul Top 50", "Expert Choice": "Alegerea juriului",
    "View the official finalists ↗": "Vezi lista oficială a finaliștilor ↗", "Bring a photograph home": "Ia o fotografie cu tine",
    "Made to live": "Creată să trăiască", "on your wall.": "pe peretele tău.",
    "Order a full-resolution digital file for $25 per photograph, or ask about a physical print. Choose an image below and email me; I’ll arrange payment and send the digital file by email.": "Poți comanda fișierul digital la rezoluție maximă cu 25 $ per fotografie sau poți întreba despre un print fizic. Alege o imagine și scrie-mi; stabilim plata, iar apoi îți trimit fișierul pe e-mail.",
    "Ask about a print": "Întreabă despre un print", "Full-resolution digital file": "Fișier digital la rezoluție maximă",
    "per photograph": "per fotografie", "Digital file: $25 per image · Physical print sizes and pricing by enquiry": "Fișier digital: 25 $ per imagine · Dimensiunile și prețul printurilor fizice se stabilesc prin e-mail",
    "A few to begin with": "Câteva imagini de început", "Selected for print": "Selectate pentru print",
    "Black & white · Street": "Alb-negru · Stradă", "Travel · Quiet moments": "Călătorii · Momente liniștite",
    "Travel · Colour": "Călătorii · Culoare", "Landscape · Evening": "Peisaj · Amurg", "Street · Colour": "Stradă · Culoare",
    "Street · Long exposure": "Stradă · Expunere lungă", "Get $25 download ↗": "Descarcă la 25 $ ↗",
    "Interested in another image? Open it in the gallery and choose “Contact me” to include that photograph in your print enquiry.": "Te interesează altă fotografie? Deschide-o în galerie și alege „Contactează-mă” pentru a o include în cererea ta.",
    "Let’s make something memorable": "Hai să creăm ceva memorabil", "Get in touch.": "Să vorbim.",
    "For photography, film, prints, or a good idea that deserves a conversation.": "Pentru fotografie, film, printuri sau o idee bună despre care merită să vorbim.",
    "Follow along": "Urmărește-mă", "Based in Galați, Romania · Open to projects everywhere": "Din Galați, România · Disponibil pentru proiecte oriunde",
    "Photographer · Filmmaker": "Fotograf · Regizor",
    "TopPhotoAwards · 2026": "TopPhotoAwards · 2026", "FILMMIC 2026 · PHOTOGRAPHY": "FILMMIC 2026 · FOTOGRAFIE",
    "TOPPHOTOAWARDS · SEPTEMBER 11, 2026": "TOPPHOTOAWARDS · 11 SEPTEMBRIE 2026",
    "TOPPHOTOAWARDS · MARCH 20, 2026": "TOPPHOTOAWARDS · 20 MARTIE 2026",
    "TOPPHOTOAWARDS · JULY 24, 2026": "TOPPHOTOAWARDS · 24 IULIE 2026",
    "TOPPHOTOAWARDS · JUNE 19, 2026": "TOPPHOTOAWARDS · 19 IUNIE 2026",
    "TOPPHOTOAWARDS · MAY 15, 2026": "TOPPHOTOAWARDS · 15 MAI 2026",
    "TOPPHOTOAWARDS · JULY 10, 2026": "TOPPHOTOAWARDS · 10 IULIE 2026",
    "FILMMIC 17TH EDITION · PHOTOGRAPHY": "FILMMIC · EDIȚIA A XVII-A · FOTOGRAFIE",
    "“Loneliness” · 1st Prize": "„Singurătate” · Premiul I", "“In Search of Happiness” · 3rd Prize": "„In Search of Happiness” · Premiul III",
    "Photography / Places": "Fotografie / Locuri", "Photo journal": "Jurnal foto",
    "Photographs connected to places, with locations added only when confirmed.": "Fotografii legate de locuri, cu locații adăugate doar după confirmare.",
    "EUROPE": "EUROPA", "A map of where the photographs lead": "O hartă a locurilor surprinse",
    "Choose a city to see the photographs currently placed there.": "Alege un oraș pentru a vedea fotografiile asociate.",
    "Choose a city": "Alege un oraș", "To place": "De plasat", "Location to confirm": "Locație de confirmat",
    "Quiet passages and pale façades.": "Pasaje liniștite și fațade deschise la culoare.",
    "Street life and a quiet park-side view.": "Viața străzii și o priveliște liniștită din parc.",
    "Canals, light, and movement on the water.": "Canale, lumină și mișcare pe apă.",
    "This photograph is waiting for a city match.": "Această fotografie așteaptă să-i fie confirmat orașul.",
    "There are no confirmed photos for this city yet. More locations will appear as we place the images.": "Nu există încă fotografii confirmate pentru acest oraș. Vor apărea pe măsură ce identificăm imaginile.",
    "A narrow Metz alley with a no-entry sign": "O alee îngustă din Metz, cu indicator de acces interzis",
    "Pale Metz façade with blue windows": "Fațadă deschisă la culoare din Metz, cu ferestre albastre",
    "Pedestrian street in Luxembourg": "Stradă pietonală din Luxembourg",
    "Water and trees in Luxembourg at dusk": "Apă și copaci în Luxembourg, la amurg",
    "A small boat beside the water; location to confirm": "O barcă mică lângă apă; locație de confirmat",
    "The Language of Flowers Photo Contest 2026": "Concursul foto The Language of Flowers 2026",
    "Conceptual Photography Contest": "Concursul de fotografie conceptuală", "Fine Art Portrait Photography Contest": "Concursul de fotografie Fine Art Portrait",
    "Strike a Pose: Model Photo Contest 2026": "Concursul foto de portret Strike a Pose 2026",
    "Urban Architecture Photography Contest": "Concursul de fotografie de arhitectură urbană",
    "“Lost” · Calm & Clear: Minimalism Photography Contest": "„Lost” · Concursul de fotografie minimalistă Calm & Clear",
    "30th National Gheorghe Naum Graphics Competition — Photography": "Concursul Național de Grafică „Gheorghe Naum”, ediția a XXX-a — Fotografie",
    "26th Spring of the Arts Competition, Bacău": "Concursul „Primăvara Artelor”, ediția a XXVI-a, Bacău",
    "Prints are available by enquiry": "Printurile sunt disponibile la cerere",
    "TopPhotoAwards · September 11, 2026": "TopPhotoAwards · 11 septembrie 2026",
    "TopPhotoAwards · March 20, 2026": "TopPhotoAwards · 20 martie 2026",
    "TopPhotoAwards · July 24, 2026": "TopPhotoAwards · 24 iulie 2026",
    "TopPhotoAwards · June 19, 2026": "TopPhotoAwards · 19 iunie 2026",
    "TopPhotoAwards · May 15, 2026": "TopPhotoAwards · 15 mai 2026",
    "TopPhotoAwards · July 10, 2026": "TopPhotoAwards · 10 iulie 2026",
    "Night ride": "Cursă nocturnă", "Between trains": "Între trenuri", "Venice, in the sun": "Veneția, în soare",
    "Last light by the river": "Ultima lumină pe malul râului", "Blue hour": "Ora albastră", "The city in motion": "Orașul în mișcare",
    "The idea of you": "Ideea ta", "A day in Bucharest": "O zi în București",
    "Each print is arranged by enquiry · No payment required to ask": "Printurile se comandă prin e-mail · Nu este necesară plata pentru a întreba",
    "Photograph by Alexandru Țîrdea": "Fotografie de Alexandru Țîrdea",
    "A cyclist moving through the city at night, captured with motion blur": "Un biciclist străbate orașul noaptea, surprins cu efect de mișcare",
    "A quiet railway platform with a lone bag resting on a bench": "Un peron liniștit, cu o geantă uitată pe bancă",
    "Boats crossing Venice’s Grand Canal beneath the domes of Santa Maria della Salute": "Bărci traversează Marele Canal din Veneția, sub cupolele bazilicii Santa Maria della Salute",
    "A stone bridge and riverside buildings beneath a dramatic evening sky": "Un pod de piatră și clădiri de pe mal, sub cerul dramatic al serii",
    "Two glowing streetlights against a blue and rose-coloured twilight sky": "Două felinare aprinse pe un cer de amurg, în nuanțe de albastru și roz",
    "City traffic trails pass a historic clock building at dusk": "Luminile traficului trec pe lângă o clădire istorică cu ceas, la amurg",
    "Open navigation": "Deschide meniul", "Open image menu": "Deschide meniul fotografiei",
    "Choose language": "Alege limba", "English": "Engleză",
    "Photo viewer": "Vizualizator foto", "Close": "Închide", "Previous": "Anterior", "Next": "Următorul",
    "A photograph of Alexandru Țîrdea outdoors": "Fotografie cu Alexandru Țîrdea în aer liber",
    "Portrait of Alexandru-Constantin Țîrdea": "Portretul lui Alexandru-Constantin Țîrdea",
    "Loneliness, the black-and-white photograph awarded first prize at FILMMIC 2026": "Loneliness, fotografia alb-negru care a câștigat Premiul I la FILMMIC 2026",
    "In Search of Happiness, the FILMMIC 2025 finalist photograph showing a child running along a beach": "In Search of Happiness, fotografia finalistă la FILMMIC 2025, cu un copil alergând pe plajă",
    "Open official Top 20 Award certificate for The Language of Flowers Photo Contest 2026": "Deschide diploma oficială Top 20 pentru concursul foto The Language of Flowers 2026",
    "Open official Expert Choice certificate for Conceptual Photography Contest": "Deschide diploma oficială Expert Choice pentru concursul de fotografie conceptuală",
    "Open official Expert Choice certificate for Fine Art Portrait Photography Contest": "Deschide diploma oficială Expert Choice pentru concursul Fine Art Portrait",
    "Open official Expert Choice certificate for Strike a Pose: Model Photo Contest 2026": "Deschide diploma oficială Expert Choice pentru concursul Strike a Pose 2026",
    "Open official Expert Choice certificate for Urban Architecture Photography Contest": "Deschide diploma oficială Expert Choice pentru concursul de arhitectură urbană",
    "Open official Top 50 Award certificate for Calm & Clear: Minimalism Photography Contest": "Deschide diploma oficială Top 50 pentru concursul de fotografie minimalistă Calm & Clear",
    "Official TopPhotoAwards Top 20 Award certificate for The Language of Flowers Photo Contest 2026, dated September 11, 2026": "Diplomă oficială TopPhotoAwards Top 20 pentru concursul The Language of Flowers 2026, din 11 septembrie 2026",
    "Official TopPhotoAwards Expert Choice certificate for Conceptual Photography Contest, dated March 20, 2026": "Diplomă oficială TopPhotoAwards Expert Choice pentru concursul de fotografie conceptuală, din 20 martie 2026",
    "Official TopPhotoAwards Expert Choice certificate for Fine Art Portrait Photography Contest, dated July 24, 2026": "Diplomă oficială TopPhotoAwards Expert Choice pentru concursul Fine Art Portrait, din 24 iulie 2026",
    "Official TopPhotoAwards Expert Choice certificate for Strike a Pose: Model Photo Contest 2026, dated June 19, 2026": "Diplomă oficială TopPhotoAwards Expert Choice pentru concursul Strike a Pose 2026, din 19 iunie 2026",
    "Official TopPhotoAwards Expert Choice certificate for Urban Architecture Photography Contest, dated May 15, 2026": "Diplomă oficială TopPhotoAwards Expert Choice pentru concursul de arhitectură urbană, din 15 mai 2026",
    "Official TopPhotoAwards Top 50 Award certificate for Calm & Clear: Minimalism Photography Contest, dated July 10, 2026": "Diplomă oficială TopPhotoAwards Top 50 pentru concursul Calm & Clear, din 10 iulie 2026",
    "Open a photo to view it larger": "Deschide fotografia pentru a o vedea mărită",
    "Say hello": "Scrie-mi", "Photo print or full-resolution inquiry": "Întrebare despre print sau fișier la rezoluție maximă"
  };

  const attributes = {
    "Watch Lady Tan’s Circle of Women on YouTube — Boovie 2026 first prize": "Urmărește Doamna Tan și cercul binelui pe YouTube — Premiul I Boovie 2026",
    "Watch A Good Life on YouTube — Boovie 2025 special prize": "Urmărește A Good Life pe YouTube — Premiul special Boovie 2025",
    "Selected Work — Alexandru Țîrdea": "Lucrări selectate — Alexandru Țîrdea",
    "Street — Alexandru Țîrdea": "Stradă — Alexandru Țîrdea", "Landscape — Alexandru Țîrdea": "Peisaj — Alexandru Țîrdea",
    "Events — Alexandru Țîrdea": "Evenimente — Alexandru Țîrdea", "People — Alexandru Țîrdea": "Oameni — Alexandru Țîrdea",
    "Nature & Wildlife — Alexandru Țîrdea": "Natură și faună sălbatică — Alexandru Țîrdea",
    "Still Life — Alexandru Țîrdea": "Natură statică — Alexandru Țîrdea", "Short Films — Alexandru Țîrdea": "Scurtmetraje — Alexandru Țîrdea",
    "Awards — Alexandru Țîrdea": "Premii — Alexandru Țîrdea", "Prints — Alexandru Țîrdea": "Printuri — Alexandru Țîrdea",
    "Contact — Alexandru Țîrdea": "Contact — Alexandru Țîrdea", "Alexandru-Constantin Țîrdea — Photographer": "Alexandru-Constantin Țîrdea — Fotograf",
    "A photograph of Alexandru Țîrdea outdoors": "Fotografie cu Alexandru Țîrdea în aer liber",
    "Photography portfolio of Alexandru Țîrdea.": "Portofoliul fotografic al lui Alexandru Țîrdea.",
    "Short films and cinematic work by Alexandru Țîrdea.": "Scurtmetraje și proiecte cinematografice de Alexandru Țîrdea.",
    "Meet Alexandru-Constantin Țîrdea, photographer and travel enthusiast. Explore his selected photographs.": "Descoperă portofoliul lui Alexandru-Constantin Țîrdea, fotograf pasionat de călătorii și fotografie.",
    "Ask about a fine art print of a photograph by Alexandru Țîrdea.": "Întreabă despre printul unei fotografii de Alexandru Țîrdea.",
    "Watch In Search of Happiness on YouTube — FILMMIC 2025 third prize": "Urmărește In Search of Happiness pe YouTube — Premiul III FILMMIC 2025",
    "Watch Long Story Short on YouTube — Boovie 2025 special prize": "Urmărește Long Story Short pe YouTube — Premiul special Boovie 2025",
    "Selected photographs by Alexandru Țîrdea.": "Fotografii selectate de Alexandru Țîrdea.",
    "Meet Alexandru-Constantin Țîrdea, photographer and travel enthusiast. Explore his selected photographs.": "Descoperă portofoliul lui Alexandru-Constantin Țîrdea, fotograf pasionat de călătorii și fotografie.",
    "Portfolio of photography by Alexandru Țîrdea.": "Portofoliu fotografic de Alexandru Țîrdea."
  };

  const languageToggles = Array.from(document.querySelectorAll("[data-language-toggle]"));
  const printRequests = Array.from(document.querySelectorAll(".print-card-caption")).map(function (caption) {
    return { link: caption.querySelector("a"), title: caption.querySelector("h3").textContent.trim() };
  });
  let current = "ro";
  const originals = new Map();
  const originalAttributes = new WeakMap();

  function translate(language) {
    current = language === "ro" ? "ro" : "en";
    document.documentElement.lang = current;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const source = originals.get(node);
      const trimmed = source.trim();
      const translated = translations[trimmed];
      if (translated) node.nodeValue = source.replace(trimmed, current === "ro" ? translated : trimmed);
    }
    document.querySelectorAll("[alt], [aria-label], [title], meta[name='description']").forEach(function (el) {
      let savedAttributes = originalAttributes.get(el);
      if (!savedAttributes) { savedAttributes = {}; originalAttributes.set(el, savedAttributes); }
      ["alt", "aria-label", "title", "content"].forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;
        if (attr === "content" && !el.matches("meta[name='description']")) return;
        if (!(attr in savedAttributes)) savedAttributes[attr] = el.getAttribute(attr);
        const source = savedAttributes[attr];
        el.setAttribute(attr, current === "ro" ? (translations[source] || attributes[source] || source) : source);
      });
    });
    const originalTitle = document.body.dataset.originalTitle || document.title;
    document.body.dataset.originalTitle = originalTitle;
    document.title = current === "ro" ? (attributes[originalTitle] || originalTitle) : originalTitle;
    printRequests.forEach(function (request) {
      const title = current === "ro" ? (translations[request.title] || request.title) : request.title;
      const url = new URL("https://mail.google.com/mail/");
      url.searchParams.set("view", "cm");
      url.searchParams.set("fs", "1");
      url.searchParams.set("to", "tirdea.alex2020@gmail.com");
      url.searchParams.set("su", current === "ro" ? "Cerere fișier digital la rezoluție maximă: " + title : "Full-resolution download request: " + title);
      url.searchParams.set("body", current === "ro" ? "Bună, aș dori să cumpăr fișierul digital la rezoluție maximă pentru fotografia „" + title + "”, la prețul de 25 USD. Te rog să-mi spui cum putem stabili plata și livrarea." : "Hello, I’d like to purchase the full-resolution digital file of " + title + " for $25. Please let me know how to arrange payment and delivery.");
      request.link.href = url.toString();
    });
    const printIntroLink = document.querySelector(".prints-primary");
    if (printIntroLink) {
      const url = new URL("https://mail.google.com/mail/");
      url.searchParams.set("view", "cm"); url.searchParams.set("fs", "1");
      url.searchParams.set("to", "tirdea.alex2020@gmail.com");
      url.searchParams.set("su", current === "ro" ? "Întrebare despre un print" : "Print enquiry");
      printIntroLink.href = url.toString();
    }
    languageToggles.forEach(function (toggle) {
      const isEnglish = current === "en";
      toggle.setAttribute("aria-pressed", String(isEnglish));
      toggle.setAttribute("aria-label", isEnglish ? "Switch to Romanian" : "Schimbă în engleză");
      const group = toggle.closest(".language-switch");
      if (group) {
        group.dataset.current = current;
        group.setAttribute("aria-label", isEnglish ? "Language: English. Switch to Romanian." : "Limba: română. Schimbă în engleză.");
      }
    });
    try { localStorage.setItem("portfolio-language-v2", current); } catch (_) {}
    window.dispatchEvent(new Event("portfolio-language-change"));
  }

  languageToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () { translate(current === "ro" ? "en" : "ro"); });
  });
  let saved = "ro";
  try { saved = localStorage.getItem("portfolio-language-v2") || "ro"; } catch (_) {}
  translate(saved);
  // Keep the remembered language toggle in its final position on page load.
  // Its short slide animation remains enabled for an intentional user click.
  document.documentElement.classList.add("language-ready");
  window.portfolioLanguage = function () { return current; };
})();
