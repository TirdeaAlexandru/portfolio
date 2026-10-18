(function () {
  const mail = "mailto:tirdea.alex2020@gmail.com";
  const contact = document.querySelector('a[href="contact.html"]') ? "contact.html" : "contact.html";
  const films = document.querySelector('a[href="films.html"]') ? "films.html" : "films.html";
  const awards = document.querySelector('a[href="awards.html"]') ? "awards.html" : "awards.html";
  const prints = document.querySelector('a[href="prints.html"]') ? "prints.html" : "prints.html";
  const isRo = function () { return window.portfolioLanguage && window.portfolioLanguage() === "ro"; };
  const chatEndpoint = window.PORTFOLIO_CHAT_ENDPOINT || "";
  const chatHistory = [];

  const launcher = document.createElement("button");
  launcher.className = "portfolio-guide-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-haspopup", "dialog");
  launcher.setAttribute("aria-expanded", "false");
  launcher.innerHTML = '<span aria-hidden="true">✳</span><span class="portfolio-guide-launcher-label"></span>';
  document.body.appendChild(launcher);

  const panel = document.createElement("section");
  panel.className = "portfolio-guide-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-labelledby", "portfolio-guide-title");
  panel.hidden = true;
  panel.innerHTML = '<div class="portfolio-guide-head"><div><p class="section-kicker"></p><h2 id="portfolio-guide-title"></h2></div><button type="button" class="portfolio-guide-close" aria-label="Close">×</button></div><p class="portfolio-guide-welcome"></p><div class="portfolio-guide-messages" role="log" aria-live="polite"></div><div class="portfolio-guide-prompts"></div><form class="portfolio-guide-form"><label class="sr-only" for="portfolio-guide-input"></label><input id="portfolio-guide-input" autocomplete="off"><button type="submit" aria-label="Send">↗</button></form>';
  document.body.appendChild(panel);
  const input = panel.querySelector("input");
  const messages = panel.querySelector(".portfolio-guide-messages");

  function render() {
    const ro = isRo();
    launcher.querySelector(".portfolio-guide-launcher-label").textContent = ro ? "Întreabă" : "Ask me";
    launcher.setAttribute("aria-label", ro ? "Întreabă despre portofoliu" : "Ask about the portfolio");
    panel.querySelector(".section-kicker").textContent = ro ? "ASISTENT PORTOFOLIU" : "PORTFOLIO ASSISTANT";
    panel.querySelector("h2").textContent = ro ? "Cu ce te pot ajuta?" : "Ask me about the portfolio";
    panel.querySelector(".portfolio-guide-close").setAttribute("aria-label", ro ? "Închide" : "Close");
    panel.querySelector(".portfolio-guide-welcome").textContent = chatEndpoint
      ? (ro ? "Sunt asistentul AI al portofoliului. Întreabă-mă orice despre lucrări, filme, premii sau colaborări." : "I’m the portfolio’s AI assistant. Ask me anything about the work, films, awards, or working together.")
      : (ro ? "Asistentul AI nu este conectat încă. Poți întreba despre lucrări, filme, premii, printuri sau colaborări." : "The AI assistant isn’t connected yet. You can ask about the work, films, awards, prints, or working together.");
    panel.querySelector("label").textContent = ro ? "Scrie o întrebare" : "Ask a question";
    input.placeholder = ro ? "Scrie întrebarea ta…" : "Type your question…";
    const prompts = ro ? ["Poți fotografia evenimentul meu?", "Care este prețul unui fișier digital?", "Ce filme ai realizat?"] : ["Can you photograph my event?", "How much is a digital file?", "What films have you made?"];
    panel.querySelector(".portfolio-guide-prompts").innerHTML = prompts.map(function (p) { return '<button type="button">' + p + '</button>'; }).join("");
    panel.querySelectorAll(".portfolio-guide-prompts button").forEach(function (b) {
      b.onclick = function () { input.value = b.textContent; respond(b.textContent); };
    });
  }

  async function respond(raw) {
    const question = raw.trim();
    if (!question) return;
    input.value = "";
    const userMessage = document.createElement("p");
    userMessage.className = "portfolio-guide-message portfolio-guide-message--user";
    userMessage.textContent = question;
    const assistantMessage = document.createElement("p");
    assistantMessage.className = "portfolio-guide-message portfolio-guide-message--assistant";
    messages.append(userMessage, assistantMessage);
    messages.scrollTop = messages.scrollHeight;
    if (chatEndpoint) {
      chatHistory.push({ role: "user", content: question });
      assistantMessage.textContent = isRo() ? "Mă gândesc…" : "Thinking…";
      const submit = panel.querySelector(".portfolio-guide-form > button");
      submit.disabled = true;
      try {
        const response = await fetch(chatEndpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: chatHistory.slice(-8) })
        });
        const data = await response.json();
        if (!response.ok || !data.answer) throw new Error(data.error || "Assistant unavailable");
        assistantMessage.textContent = data.answer;
        chatHistory.push({ role: "assistant", content: data.answer });
      } catch (_) {
        assistantMessage.textContent = isRo() ? "Asistentul este momentan indisponibil. Încearcă din nou sau scrie-mi prin pagina de contact." : "The assistant is unavailable right now. Please try again or message me through the contact page.";
      } finally {
        submit.disabled = false;
        messages.scrollTop = messages.scrollHeight;
      }
      return;
    }
    const q = raw.toLowerCase();
    const ro = isRo();
    let html = "";
    if (/event|wedding|photo.?video|book|hire|work with|eveniment|nunt|colabor/.test(q)) {
      html = ro ? 'Alexandru fotografiază și filmează evenimente. <a href="' + contact + '">Vezi pagina de contact</a> sau <a href="tel:+40774971394">sună la +40 774 971 394</a>.' : 'Alexandru is available for event photography and video. <a href="' + contact + '">Visit the contact page</a> or <a href="tel:+40774971394">call +40 774 971 394</a>.';
    } else if (/show.?reel|film|video|movie|cinema|scurtmetraj/.test(q)) {
      html = ro ? 'Vezi <a href="' + films + '">filmele și showreel-ul</a>.' : 'Explore the <a href="' + films + '">short films and featured showreel</a>.';
    } else if (/award|prize|winner|premi|distinc/.test(q)) {
      html = ro ? 'Premiile și selecțiile sunt pe <a href="' + awards + '">pagina de premii</a>.' : 'Awards and selections are listed on the <a href="' + awards + '">awards page</a>.';
    } else if (/print|price|cost|\$|25|buy|download|preț|cumpar/.test(q)) {
      html = ro ? 'Fișierul digital la rezoluție maximă costă 25 USD per fotografie. <a href="' + prints + '">Vezi printurile</a> sau <a href="' + mail + '">scrie un e-mail</a> pentru detalii.' : 'A full-resolution digital file is $25 per photograph. <a href="' + prints + '">Browse prints</a> or <a href="' + mail + '">email for details</a>.';
    } else if (/portrait|people|street|landscape|nature|wildlife|still.?life|portret|strad|peisaj|natur/.test(q)) {
      html = ro ? 'Explorează fotografiile după temă în <a href="work.html">selecția principală</a> și în meniul Fotografie.' : 'Browse photographs in <a href="work.html">Selected</a>, then use the Photography menu to explore each collection.';
    } else {
      html = ro ? 'Încă nu pot răspunde la această întrebare. Pot ajuta cu informațiile despre <a href="' + films + '">filme</a>, <a href="' + awards + '">premii</a>, <a href="' + prints + '">printuri</a> și <a href="' + contact + '">servicii foto-video</a>; pentru altceva, scrie-mi direct.' : 'I can’t answer that one yet. I can help with information about <a href="' + films + '">films</a>, <a href="' + awards + '">awards</a>, <a href="' + prints + '">prints</a>, and <a href="' + contact + '">event services</a>; for anything else, please message me directly.';
    }
    assistantMessage.innerHTML = html;
    messages.scrollTop = messages.scrollHeight;
  }

  launcher.addEventListener("click", function () {
    const open = panel.hidden;
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    if (open) input.focus();
  });
  panel.querySelector(".portfolio-guide-close").addEventListener("click", function () {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  });
  panel.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    respond(input.value.trim());
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) {
      panel.hidden = true;
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus();
    }
  });
  render();
  window.addEventListener("portfolio-language-change", render);

  const search = document.querySelector(".portfolio-search");
  if (search) {
    const field = search.querySelector("input");
    const status = search.querySelector("[data-search-status]");
    const results = document.createElement("div");
    results.className = "portfolio-search-results";
    results.setAttribute("aria-live", "polite");
    search.after(results);
    const photos = window.portfolioPhotos || [];
    const aliases = {
      street: ["street", "city", "urban", "traffic"], urban: ["urban", "city", "street", "architecture"],
      dusk: ["dusk", "sunset", "evening", "twilight", "night", "blue hour"],
      night: ["night", "dusk", "evening", "low light", "neon"],
      quiet: ["quiet", "calm", "still", "minimal", "solitary", "empty"],
      calm: ["calm", "quiet", "water", "minimal", "still"],
      portrait: ["portrait", "people", "face", "eye", "couple"],
      people: ["people", "portrait", "couple", "family", "crowd", "person"],
      water: ["water", "river", "lake", "sea", "boat", "swan", "coast"],
      travel: ["travel", "station", "city", "architecture", "street", "train"],
      music: ["music", "concert", "musician", "performance", "stage", "guitarist"],
      nature: ["nature", "bird", "wildlife", "animal", "park", "trees", "swan", "plant", "forest", "flower"],
      tree: ["tree", "trees", "forest", "woodland", "park", "nature"],
      trees: ["tree", "trees", "forest", "woodland", "park", "nature"],
      forest: ["forest", "trees", "woodland", "nature"],
      motion: ["motion", "blur", "cyclist", "bicycle", "traffic", "movement"],
      black: ["black", "white", "monochrome"], white: ["black", "white", "monochrome"],
      color: ["color", "vivid", "warm", "flowers", "sunset"], red: ["red", "warm", "flowers", "vivid"],
      architecture: ["architecture", "building", "geometric", "city"], boat: ["boat", "water", "sea", "river"],
      bicycle: ["bicycle", "cyclist", "motion", "street"], train: ["train", "station", "railway", "travel"],
      market: ["market", "people", "crowd", "city", "street"],
      scenes: ["street", "city", "landscape", "architecture"], scene: ["street", "city", "landscape", "architecture"],
      natura: ["nature", "wildlife", "bird", "animal", "park", "trees", "swan", "forest", "flower"], fauna: ["wildlife", "bird", "animal", "nature"],
      copac: ["tree", "trees", "forest", "woodland", "park", "nature"], copaci: ["tree", "trees", "forest", "woodland", "park", "nature"],
      padure: ["forest", "trees", "woodland", "nature"], pasari: ["bird", "wildlife", "nature", "swan"], pasare: ["bird", "wildlife", "nature", "swan"],
      animal: ["animal", "wildlife", "nature", "bird"], animale: ["animal", "wildlife", "nature", "bird"], floare: ["flower", "flowers", "nature", "color"], flori: ["flower", "flowers", "nature", "color"],
      peisaj: ["landscape", "nature", "sky", "water"], strada: ["street", "urban", "city", "traffic"], oras: ["city", "urban", "street", "architecture"],
      amurg: ["dusk", "sunset", "evening", "twilight", "night"], seara: ["evening", "dusk", "sunset", "night"],
      linistit: ["quiet", "calm", "still", "minimal", "solitary"], linistita: ["quiet", "calm", "still", "minimal", "solitary"],
      oameni: ["people", "portrait", "couple", "family", "crowd"], portret: ["portrait", "people", "face", "eye", "couple"],
      apa: ["water", "river", "lake", "sea", "boat", "swan", "coast"], bicicleta: ["bicycle", "cyclist", "motion", "street"], tren: ["train", "station", "railway", "travel"]
    };
    function normalize(text) {
      return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(function (word) {
        return word.length > 2 && !["the", "and", "with", "for", "show", "find", "photo", "photos", "picture", "pictures", "image", "images", "that", "from", "me", "at", "by", "in", "my"].includes(word);
      });
    }
    function runSearch() {
      const words = normalize(field.value);
      results.replaceChildren();
      const ranked = photos.map(function (photo) {
        const text = (photo.tags + " " + photo.title + " " + photo.award + " " + photo.file).toLowerCase();
        const score = words.reduce(function (total, word) {
          const options = aliases[word] || [word];
          return total + (options.some(function (option) { return text.includes(option); }) ? 1 : 0);
        }, 0);
        return { photo: photo, score: score };
      }).filter(function (item) { return words.length > 0 && item.score >= Math.min(words.length > 1 ? 2 : 1, words.length); })
        .sort(function (a, b) { return b.score - a.score; }).slice(0, 18);
      ranked.forEach(function (item) {
        const photo = item.photo;
        const link = document.createElement("a");
        link.className = "portfolio-search-result";
        link.href = photo.href;
        const image = document.createElement("img");
        image.src = "images/" + photo.file;
        image.alt = photo.title || photo.tags.split(" ").slice(0, 4).join(", ");
        image.loading = "lazy";
        const caption = document.createElement("span");
        caption.textContent = photo.title || photo.tags.split(" ").filter(function (tag) { return !["and", "photograph", "portfolio", "selected", "color", "black", "white", "monochrome"].includes(tag); }).slice(0, 4).join(" · ");
        link.append(image, caption);
        results.appendChild(link);
      });
      const visible = ranked.length;
      status.textContent = isRo() ? (words.length ? visible + (visible === 1 ? " fotografie găsită" : " fotografii găsite") : "Caută după atmosferă, subiect sau loc.") : (words.length ? visible + (visible === 1 ? " photograph found" : " photographs found") : "Search by mood, subject, or place.");
    }
    function renderSearchLabels() {
      const ro = isRo();
      search.querySelector("label").textContent = ro ? "Găsește o fotografie" : "Find a photograph";
      field.placeholder = ro ? "Încearcă: «stradă liniștită la amurg»" : "Try “quiet street scenes at dusk”";
      search.querySelector("button[type=reset]").textContent = ro ? "Șterge" : "Clear";
    }
    field.addEventListener("input", runSearch);
    search.querySelector("button[type=reset]").addEventListener("click", function () {
      field.value = "";
      results.replaceChildren();
      runSearch();
      field.focus();
    });
    runSearch();
    renderSearchLabels();
    window.addEventListener("portfolio-language-change", function () { runSearch(); renderSearchLabels(); });
  }
})();
